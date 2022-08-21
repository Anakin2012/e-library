import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthorisationService } from '../infrastructure/authorisation.service';
import { IRegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationFacadeService {

  constructor(private authorisationService: AuthorisationService) { 

  }

  public RegisterMember(Name : string, Surname : string, UserName : string, Password : string, Email : string) : Observable<boolean> {
    const request : IRegisterRequest = {Name, Surname, UserName, Password, Email};

    return this.authorisationService.RegisterMember(request).pipe(
      map(() => {
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );

  }

  public RegisterPremiumMember(Name : string, Surname : string, UserName : string, Password : string, Email : string) : Observable<boolean> {
    const request : IRegisterRequest = {Name, Surname, UserName, Password, Email};

    return this.authorisationService.RegisterPremiumMember(request).pipe(
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
