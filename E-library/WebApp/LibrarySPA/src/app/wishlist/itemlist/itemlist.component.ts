import { Component, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { WishListServiceFacade } from '../domain/app-services/wishlist-facade.service';
import { IWishlistItem } from '../domain/models/wishlistitem';
import { WishListItemComponent } from '../wish-list-item/wish-list-item.component';
import { AppState, IAppState } from 'src/app/shared/app-state/app-state';
import { LocalStorageKeys } from 'src/app/shared/local-storage/local-storage-keys';
import { CartFacadeService } from 'src/app/shopping-cart/domain/app-services/cart-facade.service';
import { BooksFacadeService } from 'src/app/catalog/domain/app-services/books-facade.service';
@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  public itemList : IWishlistItem[] = [];
  public currentUser : string;
  constructor(public bookService : BooksFacadeService, public cartService: CartFacadeService,
     private localStorageService: LocalStorageService,
      private service : WishListServiceFacade,
       private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    
    const appState : AppState | null = this.localStorageService.get(LocalStorageKeys.AppState)
    if(appState !== null){
      this.currentUser = appState.userName;
    }
    this.getList();
}


private getList() {
    this.service.GetList(this.currentUser).subscribe((wList) => {
        console.log(wList);
        this.itemList = wList.wishedBooks;
        console.log(this.itemList);
    });
  }


removeFromList(bookId : string){
    this.service.RemoveFromWishlist(this.currentUser, bookId).subscribe((list)=>{
      console.log(list);
     // this.getList();
    });
}

isInCart(bookId : string) : Boolean{
  var ind : Boolean;
  this.cartService.getCart(this.currentUser).subscribe((cart)=>{
    for(let _item of cart.items){
      if(_item.bookId === bookId){
        ind = true;
      }
    }
  });
  return ind;
}

}
