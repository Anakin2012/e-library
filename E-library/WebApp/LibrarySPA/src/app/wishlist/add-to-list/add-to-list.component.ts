import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WishListServiceFacade } from '../domain/app-services/wishlist-facade.service';
import { IWishlistItem } from '../domain/models/wishlistitem';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { NgToastService } from 'ng-angular-popup';
import { IWish } from '../domain/models/wishlist';
import { CartFacadeService } from 'src/app/shopping-cart/domain/app-services/cart-facade.service';
import { ICartItem } from 'src/app/shopping-cart/domain/models/ICartItem';
import { ICart } from 'src/app/shopping-cart/domain/models/ICart';
import { DataService } from 'src/app/shared/service/data.service';
@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.css']
})
export class AddToListComponent implements OnInit {
  public RecByAuthor : IWishlistItem[] = [];
  public RecByGenre : IWishlistItem[] = [];
  public appState$ : Observable<IAppState>;
  
  constructor(private service : WishListServiceFacade,
              private appStateService : AppStateService,
              private toastService : NgToastService,
              private cartService: CartFacadeService,
              private dataService : DataService) 
  {
      this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
    this.init();
  }

  private init(){
      this.appState$.pipe(
        take(1),
        switchMap((appState : IAppState) => {

          return this.service.GetList(appState.userName);
        }),
        switchMap((list) => {
          if(list.wishedBooks.length === 0){
            return of(false);
          }
          return this.service.GetRecommendationsByGenre(list.username);
        }
        )
      ).subscribe((list: IWishlistItem[] | false) =>{
        if(list === false){
          console.log("Empty wishlist!");
          return;
        }
        this.RecByGenre = list.slice(0,10);
        console.log(list);
      }
      );

      this.appState$.pipe(
        take(1),
        switchMap((appState : IAppState) => {

          return this.service.GetList(appState.userName);
        }),
        switchMap((list) => {
          if(list.wishedBooks.length === 0){
            return of(false);
          }
          return this.service.GetRecommendationsByAuthor(list.username);
        }
        )
      ).subscribe((list : IWishlistItem[] | false) =>{
        if(list === false){
          console.log("Empty wishlist!");
          return;
        }
        this.RecByAuthor = list.slice(0,10);
        console.log(list);
      }
      );

    }
  
  public onAdded(){
    this.toastService.info({detail : "Added!", summary : "Already in wishlist!", duration : 3000});
  }
  
    
  public removeFromWishlist(bookId : string){
    this.appState$.pipe(
      take(1),
      map(
       (appState : IAppState) => {
        const username : string = appState.userName;
        return username;
       }),
      switchMap((username : string) => {
        return this.service.RemoveFromWishlist(username, bookId);
       })
      ).subscribe((wish) => {
       this.dataService.notifyOther({refresh : true});
      })
   }


  public addToWishlist(bookId : string) {
    this.appState$.pipe(
      take(1),
      switchMap((appState : IAppState) => {
        const wish = this.service.GetList(appState.userName)
        return wish;
      }),
      switchMap((wish) => 
      {
       if(wish.wishedBooks.find(b => b.bookId === bookId)){
        this.toastService.error({detail : "Warning!", summary:"Wishful thinking!", duration:3000});
        return of(false);
       }
       this.toastService.info({detail :"Added to wishlist!", duration : 3000});
       return this.service.AddToWishList(wish.username,bookId);
      })
      ).subscribe((list : IWish | false) => {
        if(list === false){
          console.log("WARNING!");
          return;
        }
        console.log(list);
        this.dataService.notifyOther({refresh : true});
      });
      
  }
  
  public addToCart(id: string) {
    
    this.appState$.pipe(
      take(1),
     switchMap((appState : IAppState) => {        
          const cart = this.cartService.getCart(appState.userName);  
          return cart;
      }),
      switchMap((cart : ICart) => {
        
        if(cart.totalItems !== 0) {
          if(cart.items.find(b => b.bookId === id)) {
            return of(false);
          }
        }
        return this.cartService.addToCart(cart.username, id);
      })
    ).subscribe((cartitems: ICartItem[] | false) => {
      if (cartitems === false) {
        console.log('OK');
        this.toastService.warning({detail: "Already in basket!", summary: "You have already added this book to your basket!", duration: 3000});
      }
      else {
        console.log(cartitems);
        this.toastService.info({detail: "Added", summary: "The book has been added to your cart", duration: 3000});
        this.dataService.notifyOther({refresh: true});
      }
    });
  }
}
