import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { BooksFacadeService } from 'src/app/catalog/domain/app-services/books-facade.service';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { WishListServiceFacade } from 'src/app/wishlist/domain/app-services/wishlist-facade.service';
import { IWishlistItem } from 'src/app/wishlist/domain/models/wishlistitem';
import { BooksService } from '../../catalog/domain/infrastructure/Services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  newBooks = [];
  recommendedBooks = [];
  allBooks;
  roles: string | string[];
  public appState$ : Observable<IAppState>;

  constructor(private service: BooksFacadeService, 
              private wishListService: WishListServiceFacade,
              private appStateService: AppStateService)               
  {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
    this.appState$.subscribe((appState) => {
      this.roles = appState.roles;
    });

    if (this.roles === "Member" || this.roles==="PremiumMember") {     
      this.getRecommended();
    }
    else {
      this.getNewBooks();
    }
  }

  private getRecommended() {
    this.appState$.pipe(
      take(1),
      map((appState) => {
        const username = appState.userName;
        return username;
      }),
      switchMap((username) => { 
        return this.wishListService.GetRecommendationsByGenre(username)
      })
    ).subscribe((books: IWishlistItem[]) => {
      this.newBooks = books;
    })
  }

  private getAllBooks() {
    this.service.getBooks().subscribe((books) => {
      console.log(books);
      this.allBooks = books;
     });
  }

  private getNewBooks() {
    this.service.getBooks().subscribe((books) => {
      console.log(books);
      this.newBooks = books.slice(-3);
     });
  }
}
