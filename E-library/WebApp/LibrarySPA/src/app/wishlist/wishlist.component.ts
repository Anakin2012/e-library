import { Component, OnInit } from '@angular/core';
import { AppState } from '../shared/app-state/app-state';
import { LocalStorageKeys } from '../shared/local-storage/local-storage-keys';
import { LocalStorageService } from '../shared/local-storage/local-storage.service';
import { WishListServiceFacade } from './domain/app-services/wishlist-facade.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService, private service:WishListServiceFacade) { }
  currentUser;
  ngOnInit(): void {
    const appState : AppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
    if(appState !== null){
      this.currentUser = appState.userName;
    }
  }
public deleteList(){
  this.service.DeleteList(this.currentUser);
  this.service.GetList(this.currentUser).subscribe((wlist)=>{
    console.log(wlist.wishedBooks);
  });
}
}
