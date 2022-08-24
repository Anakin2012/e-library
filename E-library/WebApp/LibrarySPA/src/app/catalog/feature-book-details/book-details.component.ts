import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { DataService } from 'src/app/shared/service/data.service';
import { CartFacadeService } from 'src/app/shopping-cart/domain/app-services/cart-facade.service';
import { ICart } from 'src/app/shopping-cart/domain/models/ICart';
import { ICartItem } from 'src/app/shopping-cart/domain/models/ICartItem';
import { WishListServiceFacade } from 'src/app/wishlist/domain/app-services/wishlist-facade.service';
import { IWish } from 'src/app/wishlist/domain/models/wishlist';
import { BooksFacadeService } from '../domain/app-services/books-facade.service';
import { IBook } from '../domain/models/book';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  public book: IBook;
  bookId;
  RouteParamObs;
  roles: string | string[] = '';
  wishlist: IWish;
  username: string = '';
  cartItems: ICartItem[] = [];
  public appState$ : Observable<IAppState>;

  constructor(private dataService: DataService, 
              private activatedRoute: ActivatedRoute, 
              private service: BooksFacadeService, 
              private appStateService: AppStateService,
              private cartService: CartFacadeService,
              private toastService: NgToastService,
              private router: Router,
              private wishlistService : WishListServiceFacade)
  {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
    this.RouteParamObs = this.activatedRoute.paramMap.pipe(
      map((paramMap: ParamMap) => {
        this.bookId = paramMap.get('id');
        return this.bookId;
      }),
      switchMap((id: string) => this.service.getBook(id))
      ).subscribe((book) => {
        console.log(book);
        this.book = book;
      })
  }

  goToPage() {
    this.router.navigate(['/catalog/admin']);
  }

  onAddToCart(id: string) {
    this.getRoles();
    if (this.book.isPremium && this.roles !== "PremiumMember") {
      this.toastService.error({detail: "Only for premium members!", summary: "You must be a premium member to borrow this book.", duration: 3000});
      return;
    }
    
    this.addToCart(id);  
  }

  onAddToCartRed(id: string) {
    this.toastService.error({detail: 'Unavailable!', summary: 'Sorry! This book is currently borrowed by someone else!', duration: 3000});
  }

  private getRoles() {
    this.appState$.subscribe((appState) => {
      this.roles = appState.roles;
    });
  }

  private addToCart(id: string) {

    this.appStateService.getAppState().pipe(
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

  onAddToWishlist(id:string){
    this.addWishlist(id);
  }

  private addWishlist(id:string) {
    
    this.appStateService.getAppState().pipe(
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
        this.wishlist = wishlist;
        if (wishlist.wishedBooks.find(b => b.bookId === id)) {
          this.toastService.warning({detail: "Already in wishlist", summary: "You have already saved this book in your wishlist", duration: 3000});
          return of(false);
        }
        else {
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

  public onIsInWishlist(bookId : string) : boolean{
    return this.isInWishlist(bookId);
  }

  private isInWishlist(bookId: string) : boolean{
    var ind : boolean = false;
    this.appState$.pipe(
      take(1),
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username : string) => {
        return this.wishlistService.GetList(username);
      })
    ).subscribe((list) => {
      /*
      for(let item of list.wishedBooks){
        if(item.bookId === bookId)
        ind = true;
      }
      */

      if (list.wishedBooks.find(i => i.bookId === bookId)) {
        ind = true;
      }
    })
    return ind;
  }
}
