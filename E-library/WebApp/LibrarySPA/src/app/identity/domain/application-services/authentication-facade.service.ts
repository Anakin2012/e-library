import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { AppState, IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { JwtPayloadKeys } from 'src/app/shared/jwt/jwt-payload-keys';
import { JwtService } from 'src/app/shared/jwt/jwt.service';
import { AuthenticationService } from '../infrastructure/authentication.service';
import { ILoginRequest } from '../models/login-request';
import { ILoginResponse } from '../models/login-response';
import { ILogoutRequest } from '../models/logout-request';
import { IMemberDetails } from '../models/member-details';
import { IRefreshRequest } from '../models/refresh-token-request';
import { IRefreshResponse } from '../models/refresh-token-response';
import { MemberFacadeService } from './member-facade.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationFacadeService {

  constructor(private authenticationService: AuthenticationService, private appStateService : AppStateService, private jwtService : JwtService, private memberService : MemberFacadeService) {  }

  public Login(loginName: string, password : string) : Observable<boolean> {
    const request : ILoginRequest = {loginName, password};

    return this.authenticationService.Login(request).pipe(
      switchMap((loginResponse: ILoginResponse) => {
        this.appStateService.setAccessToken(loginResponse.accessToken);
        this.appStateService.setRefreshToken(loginResponse.refreshToken);

        const payload = this.jwtService.parsePayload(loginResponse.accessToken);
        this.appStateService.setUserName(payload[JwtPayloadKeys.Username]);
        this.appStateService.setRoles(payload[JwtPayloadKeys.Role]);
        this.appStateService.setEmail(payload[JwtPayloadKeys.Email]);
        this.appStateService.setMembershipExpired(payload[JwtPayloadKeys.ExpiredMembership]);

        return this.memberService.getMemberDetails(payload[JwtPayloadKeys.Username]);
      }),
      map((memberDetails: IMemberDetails) => {
        console.log(`${memberDetails.name}`);
        this.appStateService.setFirstName(memberDetails.name);
        this.appStateService.setLastName(memberDetails.surname);

        return true;
      }),
      catchError((err) => {
        console.log(err);
        this.appStateService.clearAppState();
        return of(false);
      })
    );

    
  }

  public Logout() : Observable<boolean> {
    return this.appStateService.getAppState().pipe(
      take(1),
      map((appState : IAppState) => {
        const request : ILogoutRequest = {loginName : appState.userName as string, refreshToken : appState.refreshToken as string};
        return request;
      }),
      switchMap((request : ILogoutRequest) => this.authenticationService.Logout(request)),
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


  public Refresh() : Observable<string | null> {
    return this.appStateService.getAppState().pipe(
      take(1),
      map((appState : IAppState) => {
        const request : IRefreshRequest = {loginName : appState.userName as string, refreshToken : appState.refreshToken as string};
        return request;
      }),
      switchMap((request : IRefreshRequest) => this.authenticationService.Refresh(request)),
      map((response : IRefreshResponse) => {
        this.appStateService.setAccessToken(response.accessToken);
        this.appStateService.setRefreshToken(response.refreshToken);

        return response.accessToken;
      }),
      catchError((err) => {
        console.error(err);
        this.appStateService.clearAppState();
        return of(null);
      })
    );
  }




}
