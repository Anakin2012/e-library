import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageKeys } from '../local-storage/local-storage-keys';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AppState, IAppState } from './app-state';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private appState: IAppState = new AppState();
  private appStateSubject : BehaviorSubject<IAppState> = new BehaviorSubject<IAppState>(this.appState);
  private appStateObservable: Observable<IAppState> = this.appStateSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) { 
    this.restoreFromLocalStorage();
  }

  public clearAppState() : void {
    this.localStorageService.clear(LocalStorageKeys.AppState);
    this.appState = new AppState();
    this.appStateSubject.next(this.appState);
  }


  private restoreFromLocalStorage() : void {
    const appState : IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
    if(appState !== null) {
      this.appState = new AppState(appState.accessToken, appState.refreshToken, appState.userName, appState.roles, appState.email, appState.membershipExpired);
    }

    this.appStateSubject.next(this.appState);

  }

  public getAppState() : Observable<IAppState> {
    return this.appStateObservable;
  }

  public setAccessToken( accessToken : string) : void {
    this.appState = this.appState.clone();
    this.appState.accessToken = accessToken;
    this.appStateSubject.next(this.appState);

    this.localStorageService.set(LocalStorageKeys.AppState, this.appState);

  }

  public setRefreshToken( refreshToken : string) : void {
    this.appState = this.appState.clone();
    this.appState.refreshToken = refreshToken;
    this.appStateSubject.next(this.appState);

    this.localStorageService.set(LocalStorageKeys.AppState, this.appState);

  }

  public setUserName( userName : string) : void {
    this.appState = this.appState.clone();
    this.appState.userName = userName;
    this.appStateSubject.next(this.appState);

    this.localStorageService.set(LocalStorageKeys.AppState, this.appState);

  }

  public setRoles( roles : string | string[]) : void {
    this.appState = this.appState.clone();
    this.appState.roles = roles;
    this.appStateSubject.next(this.appState);

    this.localStorageService.set(LocalStorageKeys.AppState, this.appState);
    
  }

  public setEmail( email : string ) : void {
    this.appState = this.appState.clone();
    this.appState.email = email;
    this.appStateSubject.next(this.appState);

    this.localStorageService.set(LocalStorageKeys.AppState, this.appState);
    
  }

  public setMembershipExpired( membershipExpired : string ) : void {
    this.appState = this.appState.clone();
    this.appState.membershipExpired = membershipExpired;
    this.appStateSubject.next(this.appState);

    this.localStorageService.set(LocalStorageKeys.AppState, this.appState);
    
  }


}
