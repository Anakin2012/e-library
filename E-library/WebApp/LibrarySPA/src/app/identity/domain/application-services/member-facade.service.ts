import { Injectable } from '@angular/core';
import { MemberService } from '../infrastructure/member.service';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { IMemberDetails } from '../models/member-details';
import { IChangePasswordRequest } from '../models/change-password-request';
import { AuthenticationFacadeService } from './authentication-facade.service';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IUserName } from '../models/username-model';

@Injectable({
  providedIn: 'root'
})
export class MemberFacadeService {

  constructor(private memberService : MemberService, private appStateService : AppStateService) { }

  public getMemberDetails(username : string) : Observable<IMemberDetails> {
    return this.memberService.getMemberDetails(username);
  }


  public ChangePassword(userName : string, password : string, newPassword : string) : Observable<boolean> {
    const request : IChangePasswordRequest = {userName, password, newPassword};

    return this.memberService.ChangePassword(request).pipe(
      map(() => {
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }


  public PayMembership(username : string) : Observable<boolean | null> {
    const userName : IUserName = {userName : username};
    return this.memberService.PayMembership(userName).pipe(
      map(() => {
        return true;
      }),
      catchError((err) => {
        if(err instanceof HttpErrorResponse && err.status === 406) {
          return of(null);
        }
        console.log(err);
        return of(false);
      })
    );
  }


  public DeleteAccount(username : string) : Observable<boolean> {
    return this.memberService.DeleteAccount(username).pipe(
      map(() => {
        this.appStateService.clearAppState();
        return true;
      }),
      catchError((err) => {
        console.error(err);
        return of(false);
      })
    );

  }


}
