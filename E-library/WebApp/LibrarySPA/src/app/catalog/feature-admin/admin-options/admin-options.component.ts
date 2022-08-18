import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksFacadeService } from '../../domain/app-services/books-facade.service';
import { IBook } from '../../domain/models/book';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.css']
})
export class AdminOptionsComponent implements OnInit {

  allBooks: IBook[] = [];
  editMode: boolean = false;
  @ViewChild('booksForm') form: NgForm;
  currentBookId: string;

  constructor(private service: BooksFacadeService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  onBooksFetch() {
    this.fetchBooks();
  }

  onBookCreate(books: {title: string, author: string, genre: string, language:string, description: string, 
                      coverImageFile: string, isAvailable: boolean, isPremium: boolean, rentCount: number, id: string}) {
    if (!this.editMode) {
      this.createBook(books);
    }
    else {
      this.updateBook(this.currentBookId, books);
    }
  }

  onBookEdit(id:string) 
  {
    let current = this.allBooks.find((b) => {return b.id === id});
    this.currentBookId = id;

    this.form.setValue({
      title: current.title, 
      author: current.author,
      genre: current.genre,
      language: current.language,
      description: current.description,
      coverImageFile: current.coverImageFile,
      isAvailable: current.isAvailable,
      isPremium: current.isPremium,
      rentCount: current.rentCount,
      id: current.id
    });

    this.editMode = true;
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

  private createBook(books: {title: string, author: string, genre: string, language:string, description: string, 
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
        this.fetchBooks();
      });

  }

  private updateBook(id: string, books: {title: string, author: string, genre: string, language:string, description: string, 
    coverImageFile: string, isAvailable: boolean, isPremium: boolean, rentCount: number, id: string})
  {

    if (books.isPremium != true){
      books.isPremium = false;
    }
    if (books.isAvailable != true) {
      books.isAvailable = false;
    }
    
    this.service.updateBook(id, books).subscribe((res) => {
      console.log(res);
      this.fetchBooks();
    })

  }

  private deleteBook(id) {
    this.service.deleteBook(id).subscribe((res) => {
      console.log(res);
      this.fetchBooks();
    });

  }

}
