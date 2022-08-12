import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  books = [
    {Id: "602d2149e773f2a3990b47fb", Title: "Nineteen Eighty-Four", Author: "George Orwell", Genre: "Fiction", Language: "English", Description: "The book is set in 1984 in Oceania", CoverImageFile: "/assets/book_covers/1984Cover.png", IsAvailable: true, IsPremium: false, RentCount: 0},
    {Id: "602d2149e773f2a3990b47fc", Title: "Algorithms to Live By: The Computer Science of Human Decisions", Author: "Brian Christian", Genre: "Computer Science", Language: "English", Description: "An exploration of how computer algorithms can be applied to our everyday lives", CoverImageFile: "/assets/book_covers/Algorithms.png", IsAvailable: true, IsPremium: true, RentCount: 0},
    {Id: "602d2149e773f2a3990b47f4", Title: "Crime And Punishment", Author: "Fyodor Dostoyevsky", Genre: "Psychological fiction", Language: "Russian", Description: "Raskolnikov, a destitute and desperate former student.", CoverImageFile: "/assets/book_covers/Crime&PunishmentCover.png", IsAvailable: false, IsPremium: false, RentCount: 0}
  ];

}
