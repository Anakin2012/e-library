import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IBook } from '../book/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  public getAllBooks() {
    return this.http.get<{[key: string]: IBook}>('http://localhost:8000/api/v1/Catalog/GetBooks')
    .pipe(map((res) => {
      const books = [];
      for(const key in res) {
        if(res.hasOwnProperty(key)) {
          books.push({...res[key], id:key})
        }
      }
      return books;
    }))
   
  }
  

  /*
  ngOnInit() {
    this.fetchBooks();
  }

  onBooksFetch() {
    this.fetchBooks();
  }
*/

 
/*
  public fetchBooks(): Observable<IBook[]> {
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

/*
  books = [
    {Id: "602d2149e773f2a3990b47fb", Title: "Nineteen Eighty-Four", Author: "George Orwell", Genre: "Fiction", Language: "English", Description: "1984 is a dystopian novella by George Orwell published in 1949, which follows the life of Winston Smith, a low ranking member of 'the Party', who is frustrated by the omnipresent eyes of the party, and its ominous ruler Big Brother. 'Big Brother' controls every aspect of people's lives.", CoverImageFile: "/assets/book_covers/1984Cover.png", IsAvailable: true, IsPremium: false, RentCount: 0},
    {Id: "602d2149e773f2a3990b47fc", Title: "Algorithms to Live By: The Computer Science of Human Decisions", Author: "Brian Christian", Genre: "Computer Science", Language: "English", Description: "An exploration of how computer algorithms can be applied to our everyday lives to solve common decision-making problems and illuminate the workings of the human mind.", CoverImageFile: "/assets/book_covers/Algorithms.png", IsAvailable: true, IsPremium: true, RentCount: 0},
    {Id: "602d2149e773f2a3990b47f4", Title: "Crime And Punishment", Author: "Fyodor Dostoyevsky", Genre: "Psychological fiction", Language: "Russian", Description: "Raskolnikov, a destitute and desperate former student, wanders through the slums of St Petersburg and commits a random murder without remorse or regret. He imagines himself to be a great man, a Napoleon: acting for a higher purpose beyond conventional moral law.", CoverImageFile: "/assets/book_covers/Crime&PunishmentCover.png", IsAvailable: false, IsPremium: false, RentCount: 0}
  ];
*/

}
