import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { MemberFacadeService } from '../../domain/application-services/member-facade.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public appState$: Observable<IAppState>;

  constructor(private appStateService: AppStateService, private memberService : MemberFacadeService) {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
  }

  public changePassword(userName: string, password: string, newPassword : string) : void {
    
    this.memberService.ChangePassword(userName, password, newPassword).subscribe((success : boolean) => {
      if(success == true) {
        window.alert('Password changed!');
      }
      else {
        window.alert('Password not changed!');
      }
    });

  }

  public DeleteAccount(userName : string) : void {
    this.memberService.DeleteAccount(userName).subscribe((success : boolean) => {
      if(success == true) {
        window.alert('Account deleted');
      }
      else {
        window.alert('Account not deleted!');
      }
    });
  }

  public payMembership(userName : string) : void {
    
    this.memberService.PayMembership(userName).subscribe((success : boolean) => {
      if(success == true) {
        window.alert('Membership payed!');
      }
      else {
        window.alert('Membership not payed!');
      }
    });
  }

}
