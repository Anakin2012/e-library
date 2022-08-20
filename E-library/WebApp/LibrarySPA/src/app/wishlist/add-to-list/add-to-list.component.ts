import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishListServiceFacade } from '../domain/app-services/wishlist-facade.service';
import { IWishlistItem } from '../domain/models/wishlistitem';
import { WishlistComponent } from '../wishlist.component';
import { LibraryitemListComponent } from 'src/app/library/feature-show-items/items-list/libraryitem-list.component';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { LocalStorageKeys } from 'src/app/shared/local-storage/local-storage-keys';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { SearchComponent } from 'src/app/catalog/feature-search/search/search.component';
@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.css']
})
export class AddToListComponent implements OnInit {
  public RecByAuthor : IWishlistItem[] = [];
  public RecByGenre : IWishlistItem[] = [];
  public currentUser : string;
  paramObs;
  keys;
  constructor(private localStorageService: LocalStorageService,
    private service : WishListServiceFacade, private activatedRoute:ActivatedRoute) {

  }

  ngOnInit(): void {
    const appState : IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
    if(appState !== null){
      this.currentUser = appState.userName;
    }
    this.init();
  }

  private init(){
    this.service.GetRecommendationsByAuthor(this.currentUser).subscribe((list)=>
    {this.RecByAuthor = list;
     console.log(list);});
     this.service.GetRecommendationsByGenre(this.currentUser).subscribe((list)=>
     {this.RecByGenre = list;
      console.log(list);});
  
    }
    public AddBook(bookId : string){
      this.service.AddToWishList(this.currentUser, bookId);
      this.service.GetList(this.currentUser).subscribe((list)=>{
        console.log(list);
      });
    }
}
