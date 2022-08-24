import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { AdminFacadeService } from '../../domain/application-services/admin-facade.service';
import { IFullMemberDetails } from '../../domain/models/full-member-details';

@Component({
  selector: 'app-manage-memberships',
  templateUrl: './manage-memberships.component.html',
  styleUrls: ['./manage-memberships.component.css']
})
export class ManageMembershipsComponent implements OnInit, OnDestroy {
  public appState$: Observable<IAppState>;
  public members: IFullMemberDetails[] = [];
  public AddingCredentialsTo : string;
  public AddCredentialsMode : boolean;
  public addCredentialsForm: FormGroup;

  constructor(private appStateService: AppStateService, private adminService : AdminFacadeService) {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
    this.AddCredentialsMode = false;
    this.addCredentialsForm = new FormGroup({
      credentials: new FormControl("", [Validators.required]),
    });
    this.getAllMembersDetails();
  }

  ngOnDestroy(): void {
    
  }
  

  private getAllMembersDetails() : void {
    this.adminService.GetAllMembersDetails().subscribe((members : IFullMemberDetails[]) => {
      this.members = members;
      console.log(this.members);
    });
  }

  public SendMail(userName : string, name : string, surname : string, email : string) : void {
    this.adminService.SendMembershipExpiringMail(userName, name, surname, email).subscribe((success : boolean) => {
      if(success === true) {
        window.alert(`Mail to ${userName} has just been sent!`);
      }
      else {
        window.alert(`Mail not sent!`);
      }
    });
  }

  public CancelMembership(userName : string) : void {
    this.adminService.CancelMembershipOfMember(userName).subscribe((success : boolean) => {
      if(success === true) {
        window.alert(`Membership of ${userName} has just been canceled!`);
        window.location.reload();
      }
      else {
        window.alert(`Membership not canceled!`);
      }
    });
  }

  public SetAddCredentialsMode(mode : boolean, username : string) {
    this.AddCredentialsMode = mode;
    this.AddingCredentialsTo = username;
  }


  public AddCredentialsToMember(userName : string) : void {
    if (this.addCredentialsForm.invalid) {
      window.alert('Form is invalid');
      return;
    }

    this.adminService.AddCredentialsToMember(userName, this.addCredentialsForm.value.credentials).subscribe((success : boolean) => {
      if(success === true) {
        window.location.reload();
        window.alert(`${this.addCredentialsForm.value.credentials} credentials added to member ${userName}`);
        this.AddCredentialsMode = false;
        this.AddingCredentialsTo = '';
        this.addCredentialsForm.reset();
      }
      else {
        window.alert('Error!');
      }
    });

  }

}