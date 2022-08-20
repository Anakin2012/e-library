import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AppStateService } from '../app-state/app-state.service';
import { IAppState } from '../app-state/app-state';
import { AuthenticationFacadeService } from 'src/app/identity/domain/application-services/authentication-facade.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private readonly whiteListUrls : string[] = [
    '/api/v1/Login/Login',
    '/api/v1/Catalog/GetBooks',
    '/api/v1/Catalog/GetBookById/{id}',
    '/api/v1/Catalog/GetBooksByGenre/{genre}',
    '/api/v1/Catalog/GetBooksByAuthor/{author}',
    '/api/v1/Catalog/GetBooksByTitle/{title}',
    '/api/v1/WishList/GetList/{username}',
    '/api/v1/WishList/addBookToWishList/{username}/{bookId}'
  ];

  private isRefreshing : boolean = false;
  private refreshedAccessTokenSubject : BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private appStateService : AppStateService, private authenticationService : AuthenticationFacadeService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.isWhiteListed(request.url)) {
      return next.handle(request);
    }

    return this.appStateService.getAppState().pipe(
      take(1),
      switchMap((appState : IAppState) => {
        if(appState.accessToken !== undefined) {
          request = this.addToken(request, appState.accessToken);
        }

        return next.handle(request);
      }),
      catchError((err) => {
        if(err instanceof HttpErrorResponse && err.status === 401) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshedAccessTokenSubject.next(null);
      
            return this.authenticationService.Refresh().pipe(
              switchMap((accessToken: string | null) => {
                if (accessToken === null) {
                  return throwError(() => new Error('Refresh token flow failed'));
                }
      
                this.isRefreshing = false;
                this.refreshedAccessTokenSubject.next(accessToken);
                return next.handle(this.addToken(request, accessToken));
              })
            );
            
          }
      
          return this.refreshedAccessTokenSubject.pipe(
            filter((token: string | null) => token !== null),
            take(1),
            switchMap((accessToken: string | null) => next.handle(this.addToken(request, accessToken as string)))
          );


        }
        return throwError(() => err);
      })
    );

  }

  private isWhiteListed(url : string) : boolean {
    return this.whiteListUrls.some((whiteListedUrl : string) => url.includes(whiteListedUrl));
  }

  private addToken(request : HttpRequest<unknown>, accessToken : string) : HttpRequest<unknown> {
    return request.clone({
      setHeaders : {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }

}
