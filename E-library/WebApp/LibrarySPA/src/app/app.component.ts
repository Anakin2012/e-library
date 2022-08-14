import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { map, Observable } from 'rxjs';
import { IBook } from './book/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LibrarySPA';

  constructor(private http: HttpClient){

  }

  ngOnInit() {
   // this.fetchBooks();
  }
/*
  onBooksFetch() {
    this.fetchBooks();
  }

  private fetchBooks() {
    this.http.get<{[key: string]: IBook}>('http://localhost:8000/api/v1/Catalog/GetBooks')
    .pipe(map((res) => {
      const books = [];
      for(const key in res) {
        if(res.hasOwnProperty(key)) {
          books.push({...res[key], id:key})
        }
      }
      return books;
    }))
    .subscribe((books) => {
      console.log(books);
      this.allBooks = books;
    })
  }
  */
}
