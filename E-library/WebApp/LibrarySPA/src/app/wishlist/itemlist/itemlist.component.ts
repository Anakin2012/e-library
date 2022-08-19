import { Component, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { WishListServiceFacade } from '../domain/app-services/wishlist-facade.service';
import { IWishlistItem } from '../domain/models/wishlistitem';
import { WishListItemComponent } from '../wish-list-item/wish-list-item.component';
import { AppState, IAppState } from 'src/app/shared/app-state/app-state';
import { LocalStorageKeys } from 'src/app/shared/local-storage/local-storage-keys';
@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  public itemList : IWishlistItem[] = []
  constructor(private localStorageService: LocalStorageService, private service : WishListServiceFacade, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getList();
}


private getList() {
    const appState : AppState | null = this.localStorageService.get(LocalStorageKeys.AppState)
    if(appState !== null){
    this.service.GetList(appState.userName).subscribe((wList) => {
        console.log(wList);
        this.itemList = wList.list;
    });
  }
}

removeFromList(bookId : string){
  const appState : AppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
  if(appState !== null){
    this.service.RemoveFromWishlist(appState.userName, bookId).subscribe((list)=>{
      console.log(list);
      this.getList();
    });
  }
}

}
