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
  paramObs;
  keys;
  constructor(private localStorageService: LocalStorageService,
    private service : WishListServiceFacade, private activatedRoute:ActivatedRoute) {

  }

  ngOnInit(): void {
    
    this.init();
  }

  private init(){
    const appState : IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
    if(appState !== null) {
    this.service.GetRecommendationsByAuthor(appState.userName).subscribe((list)=>
    {this.RecByAuthor = list;
     console.log(list);});
     this.service.GetRecommendationsByGenre(appState.userName).subscribe((list)=>
     {this.RecByGenre = list;
      console.log(list);});
     }
  
    }
    public AddBook(bookId : string){
      const appState : IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
      if(appState !== null){
      this.service.AddToWishList(appState.userName, bookId);
      this.service.GetList(appState.userName).subscribe((list)=>{
        console.log(list);
      });
      }
    }
}
