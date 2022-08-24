import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFullMemberDetails } from '../models/full-member-details';
import { IMemberCredentials } from '../models/member-credentials';
import { IMemberDetails } from '../models/member-details';
import { IRegisterRequest } from '../models/register-request';
import { IUserName } from '../models/username-model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly url: string = 'http://localhost:4000/api/v1/Administrator';

  constructor(private httpClient : HttpClient) { }

  public RegisterAdministrator(request : IRegisterRequest) : Observable<any> {
    return this.httpClient.post(`${this.url}/RegisterAdministrator`, request);
  }

  public GetAllMembers() : Observable<IMemberDetails[]> {
    return this.httpClient.get<IMemberDetails[]>(`${this.url}/GetAllMembers`);
  }

  public GetAllMembersDetails() : Observable<IFullMemberDetails[]> {
    return this.httpClient.get<IFullMemberDetails[]>(`${this.url}/GetAllMembersDetails`);
  }

  public CancelMembershipOfMember(username : IUserName) : Observable<any> {
    return this.httpClient.put(`${this.url}/CancelMembershipOfMember`, username);
  }

  public SendMembershipExpiringMail(request : IMemberDetails) : Observable<any> {
    return this.httpClient.post(`${this.url}/SendMembershipExpiringMail`, request);
  }

  public AddCredentialsToMember(request : IMemberCredentials) : Observable<any> {
    return this.httpClient.put(`${this.url}/AddCredentialsToMember`, request);
  }

}
