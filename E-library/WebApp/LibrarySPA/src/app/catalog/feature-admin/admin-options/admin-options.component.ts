import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksFacadeService } from '../../domain/app-services/books-facade.service';
import { BooksService } from '../../domain/infrastructure/Services/books.service';
import { IBook } from '../../domain/models/book';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.css']
})
export class AdminOptionsComponent implements OnInit {

  allBooks: IBook[] = [];
  @ViewChild('booksForm') form: NgForm;

  constructor(private service: BooksFacadeService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  onBooksFetch() {
    this.fetchBooks();
  }

  onBookCreate(books: {title: string, author: string, genre: string, language:string, description: string, 
                      coverImageFile: string, isAvailable: boolean, isPremium: boolean, rentCount: number, id: string}) {
      if (books.isPremium != true){
        books.isPremium = false;
      }
      if (books.isAvailable != true) {
        books.isAvailable = false;
      }
      
      console.log(books);
      this.service.createBook(books).subscribe((res) => {
        console.log(res);
      });
  }

  onBookEdit(id:string) 
  {
    console.log(this.form);
    
  }

  onBookDelete(id: string) {
    this.deleteBook(id);
  }

  private fetchBooks() {
    this.service.getBooks().subscribe((books) => {
      console.log(books); 
      this.allBooks = books;
    });
  }

  private deleteBook(id) {
    this.service.deleteBook(id).subscribe((res) => {
      console.log(res);
    });
  }

}
