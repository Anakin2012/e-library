import { Component, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishListServiceFacade } from '../domain/app-services/wishlist-facade.service';
import { IWishlistItem } from '../domain/models/wishlistitem';
import { CartFacadeService } from 'src/app/shopping-cart/domain/app-services/cart-facade.service';
import { BooksFacadeService } from 'src/app/catalog/domain/app-services/books-facade.service';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { map, Observable, pairwise, Subscription, switchMap, take, of} from 'rxjs';
import { DataService } from 'src/app/shared/service/data.service';
import { NgToastService } from 'ng-angular-popup';
import { ICart } from 'src/app/shopping-cart/domain/models/ICart';
import { ICartItem } from 'src/app/shopping-cart/domain/models/ICartItem';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})

export class ItemlistComponent implements OnInit {
  public itemList : IWishlistItem[] = [];
  public cart? : ICart;
  public appState$: Observable<IAppState>;
  subscription: Subscription;
  subscription1: Subscription;

  constructor(public bookService : BooksFacadeService, public cartService: CartFacadeService,
              private appStateService : AppStateService,
              private service : WishListServiceFacade,
              private activatedRoute:ActivatedRoute,
              private dataService : DataService,
              private toastService : NgToastService) 
       { 
        this.appState$ = this.appStateService.getAppState();
       }

  ngOnInit() {
    this.getList();
    this.getCart();
    }
   ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription1.unsubscribe();
    }


private getList() {
  this.subscription1 = this.appState$.pipe(
    take(1),
    switchMap((appState) => this.service.GetList(appState.userName))
  ).subscribe((list) => 
  {
    this.itemList = list.wishedBooks;
    console.log(list);
  }); 
  }
    private getCart() {
        this.subscription = this.appState$.pipe(
    switchMap((appState) => this.cartService.getCart(appState.userName))
  ).subscribe((list) =>
  {
    this.cart = list;
    console.log(list);
  }
  );
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
    this.itemList = wish.wishedBooks;
    this.dataService.notifyOther({refresh : true});
   })
}

public onIsInCart(bookId : string) : boolean{
  return this.isInCart(bookId);
}

private isInCart(bookId : string) : boolean{
  var ind : boolean = false;
  this.appState$.pipe(
    take(1),
    map((appState : IAppState) => {
      const username = appState.userName;
      return username;
    }),
    switchMap((username) =>
    {
      var cart : Observable<ICart> | null = this.cartService.getCart(username);  
      return cart
    }
    )
  ).subscribe((cart) => {
    if(cart !== null){
    ind = cart.items.find(b => bookId ===b.bookId) !== null;
    }
  })
  return ind;
}

public onAddToCart(bookId:string){
  this.addToCart(bookId);
}

public onAdded(){
  this.toastService.info({detail : "Added!", summary : "Already in cart!", duration : 3000});
}
private addToCart(bookId : string) {
  this.appState$.pipe(
    take(1),
    switchMap((appState) => {
      if(!this.itemList.find(b => b.bookId === bookId).isAvailable){
        this.toastService.error({detail: "Not available!", duration:3000});
        return of(false);
      }
      if(this.itemList.find(b => b.bookId===bookId).isPremium && appState.roles !== "PremiumMember"){
        this.toastService.error({detail : "Only Premium!", summary:"Buy premium membership!", duration:3000});
        return of(false);
      }
      if(this.isInCart(bookId)){
        this.toastService.error({detail : "Warning", summary:"You can't buy the same book twice", duration:3000});
        return of(false);
      }

      this.toastService.info({detail : "Added to cart!", duration:3000})
      return this.cartService.addToCart(appState.userName,bookId);
    })
  ).subscribe((list : ICartItem[] | false) => {
    if(list === false){
      console.error("Error");
      return;
    }
    this.cart.items = list;
    console.log(list);
    this.dataService.notifyOther({refresh:true});
  })
}

public deleteList(){
  this.appState$.pipe(
    take(1),
    map((appState : IAppState) =>
      {return appState.userName;}
    )
  ).subscribe((username) => {
    this.service.DeleteList(username);
    this.itemList = [];
  })
 
}

}
  




