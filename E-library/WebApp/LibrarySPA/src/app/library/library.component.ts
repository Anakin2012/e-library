import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppState } from '../shared/app-state/app-state';
import { AppStateService } from '../shared/app-state/app-state.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

    constructor() { }

  ngOnInit(): void {
  }

}
