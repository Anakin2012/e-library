import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }
  searchText: string = '';

  ngOnInit(): void {
  }
  site_name :string = "e-Library";

  
}
