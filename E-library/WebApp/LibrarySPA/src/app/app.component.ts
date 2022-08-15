import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { map, Observable } from 'rxjs';
import { IBook } from './catalog/domain/models/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LibrarySPA';

  constructor(private http: HttpClient){

  }
  
  ngOnInit() {
  }

}
