import { Injectable } from '@angular/core';
import { MemberService } from '../infrastructure/member.service';
import { catchError, map, Observable, of } from 'rxjs';
import { IMemberDetails } from '../models/member-details';
import { IChangePasswordRequest } from '../models/change-password-request';

@Injectable({
  providedIn: 'root'
})
export class MemberFacadeService {

  constructor(private memberService : MemberService) { }

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


  public PayMembership(username : string) : Observable<boolean> {
    return this.memberService.PayMembership(username).pipe(
      map(() => {
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }


  public DeleteAccount(username : string) : Observable<boolean> {
    return this.memberService.DeleteAccount(username).pipe(
      map(() => {
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }


  public CancelMembership(username : string) : Observable<boolean> {
    return this.memberService.CancelMembership(username).pipe(
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
