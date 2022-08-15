import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { BooksComponent } from './books/books.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
