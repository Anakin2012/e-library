import { Component, OnInit } from '@angular/core';
import { IAppState } from '../shared/app-state/app-state';
import { LocalStorageKeys } from '../shared/local-storage/local-storage-keys';
import { LocalStorageService } from '../shared/local-storage/local-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser: string = null;
  appState : IAppState | null;
  constructor(private localStorageService : LocalStorageService) { }
  searchText: string = '';

  ngOnInit(): void {
    this.appState = this.localStorageService.get(LocalStorageKeys.AppState);
    if (this.appState != null) {
      this.currentUser = this.appState.userName;
    }
  }



  site_name :string = "e-Library";

  
}
