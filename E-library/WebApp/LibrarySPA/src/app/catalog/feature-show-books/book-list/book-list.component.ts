import { compileDeclareInjectorFromMetadata } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
import { LocalStorageKeys } from 'src/app/shared/local-storage/local-storage-keys';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { ICartItem } from 'src/app/shopping-cart/domain/models/ICartItem';
import { BooksFacadeService } from '../../domain/app-services/books-facade.service';
import { IBook } from '../../domain/models/book';
import { WishListServiceFacade } from 'src/app/wishlist/domain/app-services/wishlist-facade.service';
import { AppState, IAppState } from 'src/app/shared/app-state/app-state';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  allBooks: IBook[] = [];
  someBooks: IBook[] = [];
  currentUser: string = '';
  cartItems: ICartItem[];
  currentRoles?: string | string[];

  constructor(private service: BooksFacadeService, private localStorageService: LocalStorageService, private wishlistService: WishListServiceFacade) { 

  }

  ngOnInit(){
    const appState: IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
    if(appState !== null) {
      this.currentUser = appState.userName;
      this.currentRoles = appState.roles;
      console.log(this.currentUser);
      console.log(this.currentRoles);
    }
    this.getAllBooks();
    console.log(this.cartItems);
  }

  searchText: string = '';

  public addToWishlist(bookId:string){
    const appState : AppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
    if(appState !== null){
      this.wishlistService.AddToWishList(appState.userName, bookId);
    }
  }


  onAddToCart(username: string, id: string) {
    this.addToCart(this.currentUser, id);
  }

  private addToCart(username: string, id: string) {
    this.service.addToCart(username, id).subscribe((res) => {
      console.log(res);
        this.cartItems = res;
        location.reload();
    });
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
