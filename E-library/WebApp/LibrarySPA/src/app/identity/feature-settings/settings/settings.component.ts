import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap, take, throwError, map } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { AuthenticationFacadeService } from '../../domain/application-services/authentication-facade.service';
import { MemberFacadeService } from '../../domain/application-services/member-facade.service';

interface IChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public appState$: Observable<IAppState>;
  public changePasswordForm: FormGroup;

  constructor(private appStateService: AppStateService, private memberService : MemberFacadeService, private routerService : Router) {
    this.appState$ = this.appStateService.getAppState();
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl("", [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
  }

  public changePassword(userName: string) : void {
    if (this.changePasswordForm.invalid) {
      window.alert('Form is invalid');
      return;
    }

    const data : IChangePasswordData = this.changePasswordForm.value as IChangePasswordData;
    
    this.memberService.ChangePassword(userName, data.oldPassword, data.newPassword).subscribe((success : boolean) => {
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
      if(success === true) {
        window.alert('Account deleted!');
        this.routerService.navigate(['/Home']);
      }
      else {
        window.alert('Account not deleted!');
      }
    });

  }

  public payMembership(userName : string) : void {
    console.log(`${userName}`);
    
    this.memberService.PayMembership(userName).subscribe((success : boolean | null) => {
      if(success === null) { 
        window.alert('Membership is already payed!');
      }
      if(success == true) {
        window.alert('You have successfully paid your membership!');
        window.location.reload();
      }
      if(success == false) {
        window.alert('An error occurred while paying membership!');
      }
    });
  }

}
