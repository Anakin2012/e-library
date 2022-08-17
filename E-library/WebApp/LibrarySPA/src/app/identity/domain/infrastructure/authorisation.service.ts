import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {
  private readonly url: string = 'http://localhost:4000/api/v1/Registration';

  constructor(private httpClient: HttpClient) { 

  }

  public RegisterMember(request : IRegisterRequest) : Observable<any> {
    return this.httpClient.post<any>(`${this.url}/RegisterMember`, request);
  }

  public RegisterPremiumMember(request : IRegisterRequest) : Observable<any> {
    return this.httpClient.post<any>(`${this.url}/RegisterPremiumMember`, request);
  }

}
