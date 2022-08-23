import { Component, OnInit } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { IAppState } from '../../shared/app-state/app-state';
import { AppStateService } from '../../shared/app-state/app-state.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    site_name: string = "e-Library";
    public appState$ : Observable<IAppState>;
    
    constructor(private appStateService: AppStateService)
    {
      this.appState$ = this.appStateService.getAppState();
    }

    ngOnInit(): void {
    }
}