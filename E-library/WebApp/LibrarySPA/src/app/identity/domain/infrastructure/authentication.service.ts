import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginRequest } from '../models/login-request';
import { ILoginResponse } from '../models/login-response';
import { ILogoutRequest } from '../models/logout-request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly url: string = 'http://localhost:4000/api/v1/Login';

  constructor(private httpClient: HttpClient) { 

  }

  public Login(request : ILoginRequest) : Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`${this.url}/Login`, request);
  }

  public Logout(request : ILogoutRequest) : Observable<any> {
    return this.httpClient.post(`${this.url}/Logout`, request);
  }
}
