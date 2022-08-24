import { Component, OnInit } from '@angular/core';
import { WishListServiceFacade } from '../domain/app-services/wishlist-facade.service';
import { IWishlistItem } from '../domain/models/wishlistitem';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { catchError, map, Observable, switchMap, take } from 'rxjs';
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
  
  constructor(private service : WishListServiceFacade,
              private appStateService : AppStateService,
              private toastService : NgToastService) 
  {
      this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
    this.getWishlist();
    this.init();
  }

  private init(){
      this.appState$.pipe(
        take(1),
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

      this.appState$.pipe(
        take(1),
        map((appState : IAppState) => {
          const username : string = appState.userName;
          return username;
        }),
        switchMap((username : string) => {
          return this.service.GetRecommendationsByAuthor(username);
        })
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
    var ind : Boolean = false;
    this.appState$.pipe(
      take(1),
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username : string) => {
        return this.service.GetList(username);
      })
    ).subscribe((list) => {
      for(let item of list.wishedBooks){
        if(item.bookId === bookId)
        ind = true;
      }
    })
    return ind;
  }

}
