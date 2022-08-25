import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.css']
})
export class AdminMembersComponent implements OnInit {
  public appState$: Observable<IAppState>;

  constructor(private appStateService: AppStateService) {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
  }

  

}