import { Injectable } from '@angular/core';
import { BooksService } from '../infrastructure/Services/books.service';

@Injectable({
  providedIn: 'root'
})
export class BooksFacadeService {

  constructor(private booksService: BooksService) { }

  public getBooks() {
    return this.booksService.getAllBooks();
  }
}
