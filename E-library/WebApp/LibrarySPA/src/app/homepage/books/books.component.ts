import { Component, OnInit } from '@angular/core';
import { BooksFacadeService } from 'src/app/catalog/domain/app-services/books-facade.service';
import { BooksService } from '../../catalog/domain/infrastructure/Services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  newBooks = [];

  constructor(private service: BooksFacadeService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  private getAllBooks() {
    this.service.getBooks().subscribe((books) => {
      console.log(books);
      this.newBooks = books.slice(-3);
     });
  }
}
