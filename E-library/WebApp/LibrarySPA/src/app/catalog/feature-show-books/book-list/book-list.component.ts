import { Component, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/shopping-cart/domain/models/ICartItem';
import { BooksFacadeService } from '../../domain/app-services/books-facade.service';
import { IBook } from '../../domain/models/book';
import { WishListServiceFacade } from 'src/app/wishlist/domain/app-services/wishlist-facade.service';
import { AppState, IAppState } from 'src/app/shared/app-state/app-state';
import { DataService } from 'src/app/shared/service/data.service';
import { map, Observable, of, switchMap, take, throwError } from 'rxjs';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { CartFacadeService } from 'src/app/shopping-cart/domain/app-services/cart-facade.service';
import { NgToastService } from 'ng-angular-popup';
import { ICart } from 'src/app/shopping-cart/domain/models/ICart';
import { IWish } from 'src/app/wishlist/domain/models/wishlist';
import { IWishlistItem } from 'src/app/wishlist/domain/models/wishlistitem';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  allBooks: IBook[] = [];
  username: string = '';
  roles: string | string[] = '';
  someBooks: IBook[] = [];
  cartItems: ICartItem[];
  cart: ICart;
  public appState$ : Observable<IAppState>;
  searchText: string = '';

  constructor(private dataService: DataService,
              private service: BooksFacadeService, 
              private wishlistService: WishListServiceFacade,
              private appStateService: AppStateService,
              private cartService: CartFacadeService, 
              private toastService: NgToastService) 
  {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(){    
    this.getAllBooks();
    console.log(this.cartItems);
  }

  addToWishlist(bookId:string){
      this.addWishlist(bookId);
  }

  onAddToCart(id: string) {
    
    this.getRoles();
    var book = this.allBooks.find(b => b.id === id);
    if (book.isPremium && this.roles !== "PremiumMember") {
      this.toastService.error({detail: "Only for premium members!", summary: "You must be a premium member to borrow this book.", duration: 3000});
      return;
    }
    
    this.addToCart(id);
  }

  onAddToCartRed() {
    this.toastService.error({detail: 'Unavailable!', summary: 'Sorry! This book is currently borrowed by someone else!', duration: 3000});
  }

  private getRoles() {
    this.appState$.subscribe((appState) => {
      this.roles = appState.roles;
    })
  }

  private addToCart(id: string) {
    
    this.appState$.pipe(
      take(1),
      map((appState : IAppState) => {
        const username : string = appState.userName;
        this.username = username;
        return username;
      }),
     switchMap((username: string) => {        
          const cart = this.cartService.getCart(username);  
          return cart;
      }),
      switchMap((cart : ICart) => {
        
        if(cart.totalItems !== 0) {
          if(cart.items.find(b => b.bookId === id)) {
            return of(false);
          }
        }
        return this.cartService.addToCart(this.username, id);
      })
    ).subscribe((cartitems: ICartItem[] | false) => {
      if (cartitems === false) {
        console.log('OK');
        this.toastService.warning({detail: "Already in basket!", summary: "You have already added this book to your basket", duration: 3000});
      }
      else {
        console.log(cartitems);
        this.cartItems = cartitems;
        this.toastService.info({detail: "Added", summary: "The book has been added to your cart", duration: 3000});
        this.dataService.notifyOther({refresh: true});
      }
    });
  }

  private addWishlist(id:string) {
    
    this.appState$.pipe(
      take(1),
      map((appState : IAppState) => {
        const username : string = appState.userName;
        this.username = username;
        return username;
      }),
      switchMap((username: string) => {
        const wishlist = this.wishlistService.GetList(username);  
        return wishlist;
      }),
      switchMap((wishlist: IWish) => {
        if (wishlist.wishedBooks.find(b => b.bookId === id)) {
          this.toastService.warning({detail: "Already in wishlist", summary: "You have already saved this book in your wishlist", duration: 3000});
          return of(false);
        }
        else {
          console.log(id);
          return this.wishlistService.AddToWishList(this.username, id);
        }
      })
    ).subscribe((res: IWish | false) => {
      console.log(res);
      if (res === false) {
        console.log('OK');
      }
      else {
        this.toastService.info({detail: "Saved to wishlist", summary: "The book has been added to your wishlist", duration: 3000});
      }
    });
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    if (this.searchText != "") {
      this.getTitle(this.searchText);
      this.getAuthor(this.searchText);
      this.getGenre(this.searchText);
      console.log(this.someBooks);
    }
  }
  
  private getAllBooks() {
    this.service.getBooks().subscribe((books) => {
      console.log(books);
      this.allBooks = books;
      this.someBooks = books;
    });
  }

  private getTitle(text: string) {
    this.service.getBooksByTitle(text).subscribe((books) => {
    this.someBooks = books;
    });
  }

  private getAuthor(author: string) {
    this.service.getBooksByAuthor(author).subscribe((books) => {
      if (this.someBooks.length == 0) {
         this.someBooks = books;
      }
     });
  }

  private getGenre(genre: string) {
    this.service.getBooksByGenre(genre).subscribe((books) => {
      if (this.someBooks.length == 0) {
         this.someBooks = books;
      }
     });
  }
}
