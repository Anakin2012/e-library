import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { IAppState } from '../shared/app-state/app-state';
import { AppStateService } from '../shared/app-state/app-state.service';
import { DataService } from '../shared/service/data.service';
import { CartFacadeService } from '../shopping-cart/domain/app-services/cart-facade.service';

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
        this.appStateService.getAppState().subscribe((appstate) => {
          if (!appstate.isEmpty() && appstate.userName !== null) {
            this.loggedIn = true;
          }
          else {
            this.loggedIn = false;
          }
        })
        if (this.loggedIn) {
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
        switchMap((appState: IAppState) => this.cartService.getCart(appState.userName))
      ).subscribe((cart) => {
        this.cartItemsCount = cart.totalItems;
        console.log(this.cartItemsCount);
      });

    }
}