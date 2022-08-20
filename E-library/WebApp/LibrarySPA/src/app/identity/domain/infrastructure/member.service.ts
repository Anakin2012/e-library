import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { IMemberDetails } from '../models/member-details';
import { Observable } from 'rxjs';
import { IChangePasswordRequest } from '../models/change-password-request';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient : HttpClient) { }


  public getMemberDetails(username : string) : Observable<IMemberDetails> {
    console.log(`${username}`);
    return this.httpClient.get<IMemberDetails>(`http://localhost:4000/api/v1/Member/${username}`);
  }
  
  public ChangePassword(ChangePasswordRequest : IChangePasswordRequest) : Observable<any> {
    return this.httpClient.put<any>('http://localhost:4000/api/v1/Member/ChangePassword', ChangePasswordRequest );
  }

  public PayMembership(username : string) : Observable<any> {
    return this.httpClient.put<any>('http://localhost:4000/api/v1/Member/Pay', username );
  }

  public DeleteAccount(username : string) : Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:4000/api/v1/Member/DeleteAccount/${username}`);
  }



}
