import { Component, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/shopping-cart/domain/models/ICartItem';
import { BooksFacadeService } from '../../domain/app-services/books-facade.service';
import { IBook } from '../../domain/models/book';
import { WishListServiceFacade } from 'src/app/wishlist/domain/app-services/wishlist-facade.service';
import { AppState, IAppState } from 'src/app/shared/app-state/app-state';
import { DataService } from 'src/app/shared/service/data.service';
import { map, Observable, switchMap } from 'rxjs';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { CartFacadeService } from 'src/app/shopping-cart/domain/app-services/cart-facade.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  allBooks: IBook[] = [];
  someBooks: IBook[] = [];
  cartItems: ICartItem[];
  public appState$ : Observable<IAppState>;
  searchText: string = '';

  constructor(private dataService: DataService,
              private service: BooksFacadeService, 
              private wishlistService: WishListServiceFacade,
              private appStateService: AppStateService,
              private cartService: CartFacadeService) 
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
    this.addToCart(id);
  }

  private addToCart(id: string) {

    this.appStateService.getAppState().pipe(
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username: string) => this.cartService.addToCart(username, id))
    ).subscribe((cartitems) => {
      console.log(cartitems);
      this.cartItems = cartitems;
      this.dataService.notifyOther({refresh: true});
    });
  }

  private addWishlist(id:string) {
    
    this.appStateService.getAppState().pipe(
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username: string) => this.wishlistService.AddToWishList(username, id))
    ).subscribe((res) => {
      console.log(res);
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
