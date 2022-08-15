import { Component, OnChanges, OnInit } from '@angular/core';
import { BooksFacadeService } from '../../domain/app-services/books-facade.service';
import { IBook } from '../../domain/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  allBooks: IBook[] = [];
  someBooks: IBook[] = [];

  constructor(private service: BooksFacadeService) { 

  }

  ngOnInit(){
    this.getAllBooks();
  }

  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    this.getSearched(this.searchText);
    console.log(this.someBooks);
  }
  
  private getAllBooks() {
    this.service.getBooks().subscribe((books) => {
      console.log(books);
      this.allBooks = books;
      this.someBooks = books;
    });
  }

  private getSearched(text: string) {
    this.service.getBooksByTitle(text).subscribe((books) => {
    this.someBooks = books;
    });
  /*  this.service.getBooksByAuthor(text).subscribe((books) => {
     this.someBooks = books;
    });
    this.service.getBooksByGenre(text).subscribe((books) => {
      this.someBooks = books;
    }); */
  }

}
