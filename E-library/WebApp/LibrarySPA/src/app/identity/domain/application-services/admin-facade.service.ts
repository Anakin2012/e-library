import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { AdminService } from '../infrastructure/admin.service';
import { IFullMemberDetails } from '../models/full-member-details';
import { IMemberCredentials } from '../models/member-credentials';
import { IMemberDetails } from '../models/member-details';
import { IRegisterRequest } from '../models/register-request';
import { IUserName } from '../models/username-model';

@Injectable({
  providedIn: 'root'
})
export class AdminFacadeService {

  constructor(private adminService : AdminService, private appStateService : AppStateService ) { }

  public RegisterAdministrator(Name : string, Surname : string, UserName : string, Password : string, Email : string) : Observable<boolean> {
    const request : IRegisterRequest = {Name, Surname, UserName, Password, Email};
    
    return this.adminService.RegisterAdministrator(request).pipe(
      map(() => {
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }

  public GetAllMembers() : Observable<IMemberDetails[]> {
    return this.adminService.GetAllMembers();
  }

  public GetAllMembersDetails() : Observable<IFullMemberDetails[]> {
    return this.adminService.GetAllMembersDetails();
  }

  public CancelMembershipOfMember(userName : string) : Observable<boolean> {
    const request : IUserName = {userName};
    return this.adminService.CancelMembershipOfMember(request).pipe(
      map(() => {
        this.appStateService.setMembershipExpired('True');
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }

  public SendMembershipExpiringMail(userName : string, name : string, surname : string, email : string) : Observable<boolean> {
    const request : IMemberDetails = {userName, name, surname, email};
    return this.adminService.SendMembershipExpiringMail(request).pipe(
      map(() => {
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }

  public AddCredentialsToMember(userName : string, credentials : string) : Observable<boolean> {
    const request : IMemberCredentials = {userName : userName, credentials : Number(credentials)};

    return this.adminService.AddCredentialsToMember(request).pipe(
      map(() => {
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }

  
}