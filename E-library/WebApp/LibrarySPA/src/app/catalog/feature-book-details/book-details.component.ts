import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BooksService } from 'src/app/catalog/domain/infrastructure/Services/books.service';
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

  constructor(private activatedRoute: ActivatedRoute, private service: BooksFacadeService) { }

  ngOnInit(): void {
  
  this.RouteParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.bookId = param.get('id');
      this.service.getBook(this.bookId).subscribe((book) => {
        console.log(book);
        this.book = book;
      });
    });
  }

}
