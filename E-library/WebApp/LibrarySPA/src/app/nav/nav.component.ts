import { Component, OnInit } from '@angular/core';
import { IAppState } from '../shared/app-state/app-state';
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
    username: string = '';
    site_name: string = "e-Library";
    appState : IAppState | null;
        
    constructor(private dataService: DataService, private cartService: CartFacadeService, private localStorageService: LocalStorageService) { }

    ngOnInit(): void {
        //dodati logiku dodeljivanja total Count 
        this.appState = this.localStorageService.get(LocalStorageKeys.AppState);
        if (this.appState !== null) {
            this.username = this.appState.userName;
            console.log(this.username);
            this.getCartTotalItems(this.username);
        }

        this.dataService.notifyObservable$.subscribe(res => {
          if(res.refresh){
              // get your grid data again. Grid will refresh automatically
              this.getCartTotalItems(this.username);
          }
    })

    }

    public getCartTotalItems(username: string) {
      this.cartService.getCart(username).subscribe((cart) => {
        this.cartItemsCount = cart.totalItems;
      })
    }
    
  
}
