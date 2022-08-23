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
import { map, Observable, switchMap } from 'rxjs';
import { isPlatformWorkerApp } from '@angular/common';
import { DataService } from 'src/app/shared/service/data.service';
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
       private dataService : DataService) { 
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


public removeFromList(bookId : string){
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
    this.dataService.notifyOther({refresh : true});
   })
}

isInCart(bookId : string) : Boolean{
  var ind : Boolean = false;
  this.appStateService.getAppState().pipe(
    map((appState : IAppState) => {
      const username : string = appState.userName;
      return username;
    }),
    switchMap((username : string) => {
      return this.cartService.getCart(username);
    })
  ).subscribe((cart) => {
    for(let item of cart.items){
      if(item.bookId === bookId)
      ind = true;
    }
  })
  return ind;
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
  public removeFromWishlist(bookId : string){
    this.appStateService.getAppState().pipe(
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username) => this.service.RemoveFromWishlist(username, bookId))
    ).subscribe((list) => {
      this.itemList = list.wishedBooks;
      console.log(list);
    })
  }


}
