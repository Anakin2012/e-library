import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { IAppState } from './shared/app-state/app-state';
import { AppStateService } from './shared/app-state/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LibrarySPA';
  public appState$ : Observable<IAppState>;

  constructor(private appStateService: AppStateService){
    this.appState$ = this.appStateService.getAppState();
  }
  
  ngOnInit() {
    
  }

}
