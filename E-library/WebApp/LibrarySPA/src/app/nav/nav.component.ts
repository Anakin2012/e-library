import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { IAppState } from '../shared/app-state/app-state';
import { AppStateService } from '../shared/app-state/app-state.service';
import { LocalStorageKeys } from '../shared/local-storage/local-storage-keys';
import { LocalStorageService } from '../shared/local-storage/local-storage.service';
import { DataService } from '../shared/service/data.service';
import { CartFacadeService } from '../shopping-cart/domain/app-services/cart-facade.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    searchText: string = '';
    cartItemsCount: number;
    site_name: string = "e-Library";
    public appState$ : Observable<IAppState>;

        
    constructor(private dataService: DataService, 
                private cartService: CartFacadeService,
                private appStateService: AppStateService,
                private localStorageService: LocalStorageService)
    {
      this.appState$ = this.appStateService.getAppState();
    }

    ngOnInit(): void {
        //dodati logiku dodeljivanja total Count 
        this.getCartTotalItems();
        
        this.dataService.notifyObservable$.subscribe(res => {
          if(res.refresh){
              this.getCartTotalItems();
          }
        })
    }

    public getCartTotalItems() {
      this.appStateService.getAppState().pipe(
        switchMap((appState) => this.cartService.getCart(appState.userName))
      ).subscribe((cart) => 
      {
        this.cartItemsCount = cart.totalItems;
        console.log(this.cartItemsCount);
      }); 
    }
    
}
