import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { map, Observable, switchMap } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { DataService } from 'src/app/shared/service/data.service';
import { CartFacadeService } from 'src/app/shopping-cart/domain/app-services/cart-facade.service';
import { ICartItem } from 'src/app/shopping-cart/domain/models/ICartItem';
import { WishListServiceFacade } from 'src/app/wishlist/domain/app-services/wishlist-facade.service';
import { IWish } from 'src/app/wishlist/domain/models/wishlist';
import { IWishlistItem } from 'src/app/wishlist/domain/models/wishlistitem';
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
  cartItems: ICartItem[] = [];
  wish : IWish;
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
    this.getWish();
  }

  goToPage() {
    this.router.navigate(['/catalog/admin']);
  }

  onAddToCart(id: string) {
    this.addToCart(id);
  }


  onAddToCartRed(id: string) {
    this.toastService.error({detail: 'Unavailable!', summary: 'Sorry! This book is currently borrowed by someone else!', duration: 3000});
  }

  private addToCart(id: string) {

    this.appStateService.getAppState().pipe(
      map((appState : IAppState) => {
        const username : string = appState.userName;
        const role: string | string[] = appState.roles;
        const pair = {username, role};
        return pair;
      }),
      switchMap((pair) => { 
        if (pair.role !== "PremiumMember" && this.book.isPremium) {
          this.toastService.error({detail: "Only for premium members!", summary: "You must be a premium member to borrow this book.", duration: 3000});
          return null;
        }
        
        if (this.cartItems.length !== 0) {
          if (this.cartItems.find(b => b.bookId === this.book.id)) {
            this.toastService.warning({detail: "Already in basket!", summary: "You have already added this book to your basket", duration: 3000});
            return null;
          }
        }
      
        return this.cartService.addToCart(pair.username, id) })
    ).subscribe((cartitems) => {
      console.log(cartitems);
      this.cartItems = cartitems;
      this.dataService.notifyOther({refresh: true});
      this.toastService.info({detail: "Added", summary: "The book has been added to your cart", duration: 3000})
    });
  }
  onAddToWishlist(id:string){
    this.addWishlist(id);
  }
  private addWishlist(id:string) {
    
    this.appStateService.getAppState().pipe(
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username: string) => 
      {
        if(this.isInWishlist(id)){
          this.toastService.info({detail: "In wishlist!", summary: "You can't wish the same thing twice", duration: 3000})
          return null;
        }
        return this.wishlistService.AddToWishList(username, id)})
    ).subscribe((res) => {
      console.log(res);
      this.wish = res;
      this.dataService.notifyOther({refresh : true});
      this.toastService.info({detail: "Added", summary: "The book has been added to wishlist", duration: 3000})
    });
  }

  private getWish(){
    this.appStateService.getAppState().pipe(
      switchMap((appState) => this.wishlistService.GetList(appState.userName))
    ).subscribe((list) =>
    {
      this.wish = list;
      console.log(list);
    }
    );
  }

  private isInWishlist(bookId: string) : IWishlistItem{
    return this.wish.wishedBooks.find(b => b.bookId===bookId);
  }
}
