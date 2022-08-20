import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BooksService } from 'src/app/catalog/domain/infrastructure/Services/books.service';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { LocalStorageKeys } from 'src/app/shared/local-storage/local-storage-keys';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { ICartItem } from 'src/app/shopping-cart/domain/models/ICartItem';
import { BooksFacadeService } from '../domain/app-services/books-facade.service';
import { IBook } from '../domain/models/book';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  public book: IBook;
  bookId;
  RouteParamObs;
  currentUser: string;
  cartItems: ICartItem[];

  constructor(private activatedRoute: ActivatedRoute, private service: BooksFacadeService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    const appState: IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
    if(appState !== null) {
      this.currentUser = appState.userName;
      console.log(this.currentUser);
    }
  
  this.RouteParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.bookId = param.get('id');
      this.service.getBook(this.bookId).subscribe((book) => {
        console.log(book);
        this.book = book;
      });
    });
  }

  onAddToCart(id: string) {
    this.addToCart(this.currentUser, id);
  }

  private addToCart(username: string, id: string) {
    this.service.addToCart(username, id).subscribe((res) => {
      console.log(res);
      this.cartItems = res;
    });
  }


}
