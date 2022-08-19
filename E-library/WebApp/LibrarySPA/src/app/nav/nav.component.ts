import { Component, OnInit } from '@angular/core';
import { IAppState } from '../shared/app-state/app-state';
import { LocalStorageKeys } from '../shared/local-storage/local-storage-keys';
import { LocalStorageService } from '../shared/local-storage/local-storage.service';
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
    constructor(private cartService: CartFacadeService, private localStorageService: LocalStorageService) { }

    ngOnInit(): void {
        //dodati logiku dodeljivanja total Count 
        const appState: IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
        if (appState !== null) {
            this.username = appState.userName;
            console.log(this.username);
            this.getCartTotalItems(this.username);
        }

    }
    private getCartTotalItems(username: string) {
        this.cartService.getCartTotalItems(username).subscribe((itemsCount) => {
            this.cartItemsCount = itemsCount;
            console.log(this.cartItemsCount);
        });
    }

  
}
