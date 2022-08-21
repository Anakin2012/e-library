import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICart } from 'src/app/shopping-cart/domain/models/ICart';
import { ICartItem } from 'src/app/shopping-cart/domain/models/ICartItem';
import { IBook } from '../../models/book';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  private readonly url: string = 'http://localhost:8000/api/v1/Catalog';

  constructor(private http: HttpClient) { }

  public createBook(body: Object) {
    return this.http.post(`${this.url}/CreateBook`, body);
  }

  public updateBook(id: string, body: Object) {
    return this.http.put(`${this.url}/UpdateBook/${id}`, body);
  }

  public deleteBook(id: string) {
    return this.http.delete(`${this.url}/DeleteBookById/${id}`);
  }

  public getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.url}/GetBooks`);
  }

  public getBookById(id: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.url}/GetBookById/${id}`)
  }

  public getBooksByTitle(title: string): Observable<IBook[]> {
    return this.http.get<IBook[]>(`http://localhost:8000/api/v1/Catalog/GetBooksByTitle/${title}`);
  }

  public getBooksByGenre(text: string): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.url}/GetBooksByGenre/${text}`);
  }

  public getBooksByAuthor(text: string): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.url}/GetBooksByAuthor/${text}`);
  }


}
