import { Component, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { WishListServiceFacade } from '../domain/app-services/wishlist-facade.service';
import { IWishlistItem } from '../domain/models/wishlistitem';
import { WishListItemComponent } from '../wish-list-item/wish-list-item.component';
import { AppState} from 'src/app/shared/app-state/app-state';
import { LocalStorageKeys } from 'src/app/shared/local-storage/local-storage-keys';
import { CartFacadeService } from 'src/app/shopping-cart/domain/app-services/cart-facade.service';
import { BooksFacadeService } from 'src/app/catalog/domain/app-services/books-facade.service';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { map, Observable, pairwise, switchMap } from 'rxjs';
import { isPlatformWorkerApp } from '@angular/common';
import { DataService } from 'src/app/shared/service/data.service';
import { NgToastService } from 'ng-angular-popup';
import { ICart } from 'src/app/shopping-cart/domain/models/ICart';
@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  public itemList : IWishlistItem[] = [];
  public appState$ : Observable<IAppState>;
  constructor(public bookService : BooksFacadeService, public cartService: CartFacadeService,
    private appStateService : AppStateService,
      private service : WishListServiceFacade,
       private activatedRoute:ActivatedRoute,
       private dataService : DataService,
       private toastService : NgToastService) { 
        this.appState$ = this.appStateService.getAppState();
       }

  ngOnInit() {
    this.getList();
}


private getList() {
  this.appStateService.getAppState().pipe(
    switchMap((appState) => this.service.GetList(appState.userName))
  ).subscribe((list) => 
  {
    this.itemList = list.wishedBooks;
    console.log(list);
  }); 
  }


public removeFromWishlist(bookId : string){
   this.appStateService.getAppState().pipe(
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
  this.appStateService.getAppState().pipe(
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
private addToCart(bookId : string) {
  this.appStateService.getAppState().pipe(
    map((appState : IAppState) => {
      const username : string = appState.userName;
      const role : string | string[] = appState.roles;
      return {username, role};
    }),
    switchMap(({username, role}) => {
      if(this.itemList.find(b => b.bookId===bookId).isPremium && role !== "PremiumMember"){
        this.toastService.error({detail : "Only Premium!", summary:"Buy premium membership!", duration:3000});
        return null;
      }
      this.toastService.info({detail : "Added to cart!", duration:3000})
      return this.cartService.addToCart(username,bookId);
    })
  ).subscribe((cart) => {
    console.log(cart);
    this.dataService.notifyOther({refresh:true});
  })
}

public deleteList(){
  this.appStateService.getAppState().pipe(
    map((appState : IAppState) =>
      {return appState.userName;}
    )
  ).subscribe((username) => {
    this.service.DeleteList(username);
    this.itemList = [];
  })
 
}

public addToWishlist(bookId : string){
  this.appStateService.getAppState().pipe(
    map((appState : IAppState) => {
      const username : string = appState.userName;
      return username;
    }),
    switchMap((username) => this.service.AddToWishList(username,bookId))
  ).subscribe((list) => {
    this.itemList = list.wishedBooks;
  });

  }
  



}
