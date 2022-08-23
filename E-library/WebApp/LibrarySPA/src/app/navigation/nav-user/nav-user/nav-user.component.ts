import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { DataService } from 'src/app/shared/service/data.service';
import { CartFacadeService } from 'src/app/shopping-cart/domain/app-services/cart-facade.service';
import { ICart } from 'src/app/shopping-cart/domain/models/ICart';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css']
})
export class NavUserComponent implements OnInit {

  site_name: string = "e-Library";
  cartItemsCount: number = 0;
  public appState$ : Observable<IAppState>;
  loggedIn: boolean = false;

  constructor(private appStateService: AppStateService,
              private dataService: DataService, 
              private cartService: CartFacadeService) 
  {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void 
  {
    this.appState$.subscribe((appstate) => {
      if (appstate.roles !== 'Administrator') {
            this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
    })
    
    if (this.loggedIn === true) {
      this.getCartTotalItems();
          
    //  this.notify();   
    } 
    else {
      this.cartItemsCount = 0;
    }    
  }

  public getCartTotalItems() {

    this.appState$.pipe(
      take(1),
      switchMap((appState : IAppState) => {
        if (appState.isEmpty()) {
          return of(null);
        }
        if (appState.roles !== 'Administrator') {
          return this.cartService.getCart(appState.userName);
        }
        else  {
          return of(null);
        }
      })
    ).subscribe((cart : ICart | null) => {
      if (cart === null) {
        console.log('Null');
      }
      else {
        this.cartItemsCount = cart.totalItems;
        console.log(this.cartItemsCount);
      }
    })

  }

  public notify() {
    this.dataService.notifyObservable$.pipe(
      take(1),
      switchMap((res) => {
          return this.appState$;
      }),
      switchMap((appState : IAppState) => {
        if (appState.isEmpty()) {
          return of(null);
        }
        if (appState.roles !== 'Administrator') {
          return this.cartService.getCart(appState.userName);
        }
        else  {
          return of(null);
        }
      })
    ).subscribe((cart : ICart | null) => {
      if (cart === null) {
        console.log('Null');
      }
      else {
        this.cartItemsCount = cart.totalItems;
        console.log(this.cartItemsCount);
      }
    })
  }



}
