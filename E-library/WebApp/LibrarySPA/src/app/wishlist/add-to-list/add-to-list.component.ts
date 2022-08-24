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
import { catchError, map, Observable, switchMap } from 'rxjs';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { NgToastService } from 'ng-angular-popup';
import { IWish } from '../domain/models/wishlist';
@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.css']
})
export class AddToListComponent implements OnInit {
  public RecByAuthor : IWishlistItem[] = [];
  public RecByGenre : IWishlistItem[] = [];
  public appState$ : Observable<IAppState>;
  private wishlist? : IWish;
  dataService: any;
  constructor(private localStorageService: LocalStorageService,
    private service : WishListServiceFacade,
    private appStateService : AppStateService,
    private toastService : NgToastService) {
      this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
    this.getWishlist();
    this.init();
  }

  private init(){
    if(this.wishlist.wishedBooks.length === 0)
      return;
      this.appStateService.getAppState().pipe(
        map((appState : IAppState) => {
          const username : string = appState.userName;
          return username;
        }),
        switchMap((username : string) => {
          return this.service.GetRecommendationsByGenre(username);
        }
        )
      ).subscribe((list) =>{
        this.RecByGenre = list;
        console.log(list);
      }
      );
      this.appStateService.getAppState().pipe(
        map((appState : IAppState) => {
          const username : string = appState.userName;
          return username;
        }),
        switchMap((username : string) => {
          return this.service.GetRecommendationsByAuthor(username);
        }
        )
      ).subscribe((list) =>{
        this.RecByAuthor = list;
        console.log(list);
      }
      );

    }
  
  public onAdded(){
    this.toastService.info({detail : "Added!", summary : "Already in wishlist!", duration : 3000});
  }
  private getWishlist(){
    this.appStateService.getAppState().pipe(
        switchMap((appState) => this.service.GetList(appState.userName))
      ).subscribe((list) =>
      {
        this.wishlist = list;
        console.log(list);
      }
      );
    }

  public addToWishlist(bookId : string){
    this.appStateService.getAppState().pipe(
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username) => 
      {
       if(this.isInWishlist(bookId)){
        this.toastService.error({detail : "Warning", summary:"Wishful thinking!", duration:3000});
        return null;
       }
       this.toastService.info({summary :"Added to wishlist!", duration : 3000});
       return this.service.AddToWishList(username,bookId);
      })
      ).subscribe((list) => {
        this.wishlist = list;
        console.log(list);
        this.dataService.notifyOther({refresh : true});
      });
    
      }
  public isInWishlist(bookId : string){
    return this.wishlist.wishedBooks.find(b => b.bookId===bookId);
  }

}
