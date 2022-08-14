import { Component, OnInit } from '@angular/core';
import { BooksService } from '../Services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  newBooks = [];

  constructor(private service: BooksService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  private getAllBooks() {
    this.service.getAllBooks().subscribe((books) => {
      console.log(books);
      this.newBooks = books.slice(-3);
     });
  }
}
