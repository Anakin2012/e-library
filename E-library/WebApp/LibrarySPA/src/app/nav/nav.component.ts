import { Component, OnInit } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { IAppState } from '../shared/app-state/app-state';
import { AppStateService } from '../shared/app-state/app-state.service';
import { DataService } from '../shared/service/data.service';
import { CartFacadeService } from '../shopping-cart/domain/app-services/cart-facade.service';
import { ICart } from '../shopping-cart/domain/models/ICart';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    searchText: string = '';
    cartItemsCount: number = 0;
    site_name: string = "e-Library";
    public appState$ : Observable<IAppState>;
    loggedIn: boolean = false;
    
    constructor(private dataService: DataService, 
                private cartService: CartFacadeService,
                private appStateService: AppStateService
                )
    {
      this.appState$ = this.appStateService.getAppState();
    }

    ngOnInit(): void {
      /*
        this.appState$.subscribe((appstate) => {
          if (!appstate.isEmpty()) {
            this.loggedIn = true;
          }
          else {
            this.loggedIn = false;
          }
        })


        if (this.loggedIn === true) {
          this.getCartTotalItems();    
        } 
        else {
          this.cartItemsCount = 0;
        }
        */
    }

    public getCartTotalItems() {

      this.dataService.notifyObservable$.pipe(
        switchMap((res: boolean) => this.appStateService.getAppState()),
        switchMap((appState: IAppState) => {
          if (appState.isEmpty()) {
            return of(null);
          }
          return this.cartService.getCart(appState.userName)})
      ).subscribe((cart : ICart | null) => {
        if (cart === null) {
          console.log('Null');
        }
        else {
          this.cartItemsCount = cart.totalItems;
          console.log(this.cartItemsCount);
        }
      });

    }
}