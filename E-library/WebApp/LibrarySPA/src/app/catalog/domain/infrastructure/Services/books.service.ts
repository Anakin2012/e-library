import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IBook } from '../../models/book';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>('http://localhost:8000/api/v1/Catalog/GetBooks');
  }

  public getBookById(id: string): Observable<IBook> {
    return this.http.get<IBook>(`http://localhost:8000/api/v1/Catalog/GetBookById/${id}`)
  }

}
