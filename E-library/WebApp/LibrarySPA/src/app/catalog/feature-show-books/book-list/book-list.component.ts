import { Component, OnChanges, OnInit } from '@angular/core';
import { BooksFacadeService } from '../../domain/app-services/books-facade.service';
import { IBook } from '../../domain/models/book';
import { WishListServiceFacade } from 'src/app/wishlist/domain/app-services/wishlist-facade.service';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { LocalStorageKeys } from 'src/app/shared/local-storage/local-storage-keys';
import { AppState, IAppState } from 'src/app/shared/app-state/app-state';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  allBooks: IBook[] = [];
  someBooks: IBook[] = [];

  constructor(private storageService: LocalStorageService,private wishlistService:WishListServiceFacade, private service: BooksFacadeService) { 

  }

  ngOnInit(){
    this.getAllBooks();
  }

  searchText: string = '';

  public addToWishlist(bookId:string){
    const appState : AppState | null = this.storageService.get(LocalStorageKeys.AppState);
    if(appState !== null){
      this.wishlistService.AddToWishList(appState.userName, bookId);
    }
  }
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    if (this.searchText != "") {
      this.getTitle(this.searchText);
      this.getAuthor(this.searchText);
      this.getGenre(this.searchText);
      console.log(this.someBooks);
    }
  }
  
  private getAllBooks() {
    this.service.getBooks().subscribe((books) => {
      console.log(books);
      this.allBooks = books;
      this.someBooks = books;
    });
  }

  private getTitle(text: string) {
    this.service.getBooksByTitle(text).subscribe((books) => {
    this.someBooks = books;
    });
  }

  private getAuthor(author: string) {
    this.service.getBooksByAuthor(author).subscribe((books) => {
      if (this.someBooks.length == 0) {
         this.someBooks = books;
      }
     });
  }

  private getGenre(genre: string) {
    this.service.getBooksByGenre(genre).subscribe((books) => {
      if (this.someBooks.length == 0) {
         this.someBooks = books;
      }
     });
  }
}
