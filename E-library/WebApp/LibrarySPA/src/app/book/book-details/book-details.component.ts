import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { withLatestFrom } from 'rxjs';
import { BooksService } from 'src/app/Services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book;
  bookId;
  RouteParamObs;

  constructor(private activatedRoute: ActivatedRoute, private service: BooksService) { }

  ngOnInit(): void {
   // this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
   // this.book = this.service.books.find(x => x.Id == this.bookId);
    this.RouteParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.bookId = param.get('id');
      this.service.getAllBooks().subscribe((books) => {
        console.log(books);
        this.book = books.find(x => x.id == this.bookId);
      });
    });
 
  }

  ngOnDestroy() {
    this.RouteParamObs.unsubscribe();
  }

}
