import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { JwtPayloadKeys } from 'src/app/shared/jwt/jwt-payload-keys';
import { JwtService } from 'src/app/shared/jwt/jwt.service';
import { AuthenticationService } from '../infrastructure/authentication.service';
import { ILoginRequest } from '../models/login-request';
import { ILoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationFacadeService {

  constructor(private authenticationService: AuthenticationService, private appStateService : AppStateService, private jwtService : JwtService) {  }

  public Login(loginName: string, password : string) : Observable<boolean> {
    const request : ILoginRequest = {loginName, password};

    return this.authenticationService.Login(request).pipe(
      map((loginResponse : ILoginResponse) => {
        this.appStateService.setAccessToken(loginResponse.accessToken);
        this.appStateService.setRefreshToken(loginResponse.refreshToken);

        const payload = this.jwtService.parsePayload(loginResponse.accessToken);
        this.appStateService.setUserName(payload[JwtPayloadKeys.Username]);
        this.appStateService.setRoles(payload[JwtPayloadKeys.Role]);
        this.appStateService.setEmail(payload[JwtPayloadKeys.Email]);

        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );

    
  }

}
