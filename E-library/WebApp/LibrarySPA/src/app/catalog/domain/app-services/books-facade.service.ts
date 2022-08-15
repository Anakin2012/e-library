import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../infrastructure/Services/books.service';
import { IBook } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksFacadeService {

  constructor(private booksService: BooksService) { }

  public getBooks(): Observable<IBook[]> {
    return this.booksService.getAllBooks();
  }

  public getBook(id: string): Observable<IBook> {
    return this.booksService.getBookById(id);
  }

  public getBooksByTitle(title: string): Observable<IBook[]> {
    return this.booksService.getBooksByTitle(title);
  }

  public getBooksByGenre(genre: string): Observable<IBook[]> {
    return this.booksService.getBooksByGenre(genre);
  }

  public getBooksByAuthor(author: string): Observable<IBook[]> {
    return this.booksService.getBooksByAuthor(author);
  }

}
