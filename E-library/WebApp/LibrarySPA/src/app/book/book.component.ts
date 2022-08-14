import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { BooksService } from '../Services/books.service';
import { IBook } from './book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  allBooks: IBook[] = [];

  constructor(private service: BooksService) { }

  ngOnInit(){
    this.getAllBooks();
  }

  private getAllBooks() {
    this.service.getAllBooks().subscribe((books) => {
      console.log(books);
      this.allBooks = books;
    });
  }
}
