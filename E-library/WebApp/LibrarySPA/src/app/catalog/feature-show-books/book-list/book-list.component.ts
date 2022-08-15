import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../domain/infrastructure/Services/books.service';
import { IBook } from '../../domain/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

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
