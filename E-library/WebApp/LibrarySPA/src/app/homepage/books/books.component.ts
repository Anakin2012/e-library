import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, of, Subscription, switchMap, take } from 'rxjs';
import { BooksFacadeService } from 'src/app/catalog/domain/app-services/books-facade.service';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { WishListServiceFacade } from 'src/app/wishlist/domain/app-services/wishlist-facade.service';
import { IWishlistItem } from 'src/app/wishlist/domain/models/wishlistitem';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  newBooks = [];
  recommendedGenre = [];
  recommendedAuthor = [];
  recommendedBooks = [];
  allBooks;
  empty: boolean;
  roles: string | string[];
  wishlist = [];
  username: string = '';
  public appState$ : Observable<IAppState>;

  constructor(private service: BooksFacadeService, 
              private wishListService: WishListServiceFacade,
              private appStateService: AppStateService)               
  {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
    this.sub1 = this.appState$.subscribe((appState) => {
      this.roles = appState.roles;
      this.username = appState.userName;
    });

    if (this.roles === "Member" || this.roles==="PremiumMember") {     
      this.sub2 = this.getRecommended();
      if (this.recommendedBooks.length === 0) {
        this.empty = true;
      }
    }
    else {
      this.sub3 = this.getNewBooks();
    }
  }

  ngOnDestroy(): void {
    
    this.sub1.unsubscribe();

    if(this.sub2) {
      this.sub2.unsubscribe();
    }
    if(this.sub3) {
      this.sub3.unsubscribe();
    }
  }

  private getRecommended() {
    return this.appState$.pipe(
      take(1),
      map((appState) => {
        const username = appState.userName;
        this.username = username;
        return username;
      }),
      switchMap((username) => {
        return this.wishListService.GetList(username);
      }),
      switchMap((list) => {
        console.log('WISHHHH');
        console.log(list);
        if (list.wishedBooks.length === 0) {
          return of(false)
        }
        else {
          return this.wishListService.GetRecommendationsByGenre(this.username);
        }
      }),
      switchMap((list: IWishlistItem[] | false) => { 
        if (list === false) {
          return of(false)
        }
        else {
            this.recommendedGenre = list;
            console.log('genre: ');
            console.log(list);
            return this.wishListService.GetRecommendationsByAuthor(this.username);
        }
      })
    ).subscribe((books: IWishlistItem[] | false) => {
      if (books === false) {
        console.log('OK');
      }
      else {
        var all = books.concat(this.recommendedGenre);      
        var result = all.reduce((unique, o) => {
          if(!unique.some(obj => obj.bookId === o.bookId)) {
            unique.push(o);
          }
          return unique;
          },[]);

        this.recommendedBooks = result;
        if(this.recommendedBooks.length !== 0) {
          this.empty = false;
        }
        console.log('sve');
        console.log(this.recommendedBooks);
      }    
    });
  }

  private getNewBooks() {
    return this.service.getBooks().subscribe((books) => {
      console.log(books);
      this.newBooks = books.slice(-3);
     // this.recommendedBooks = books.slice(-3);
     });
  }
}

  
