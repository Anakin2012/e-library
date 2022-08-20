import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { LocalStorageKeys } from 'src/app/shared/local-storage/local-storage-keys';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { CartFacadeService } from '../../domain/app-services/cart-facade.service';
import { ICart } from '../../domain/models/ICart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('checkoutForm') form: NgForm;
  currentUser: string = '';
  currentName: string = '';
  surname: string = '';
  cart: ICart;

  constructor(private localStorageService: LocalStorageService, private cartService: CartFacadeService) { }

  ngOnInit(): void {
    
    const appState: IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
    if(appState !== null) {
      this.currentUser = appState.userName;
      this.getCartInfo();
      this.currentName = appState.firstName;
      this.surname = appState.lastName;
      console.log(this.currentUser);
    }
  }

  getCartInfo() {
    this.getCart(this.currentUser);
  }

  private getCart(username: string) {
    this.cartService.getCart(username).subscribe((cart) => {
      this.cart = cart;
    })
  }

  onCheckout(info: {street: string, city: string, state: string, country: string, zipCode: string, emailAddress: string}) 
  {
    this.checkout(this.currentUser, info);
  }

  private checkout(username: string, info: {street: string, city: string, state: string, country: string, zipCode: string, emailAddress: string})
  {
    this.cartService.checkout(username, info).subscribe((res) => {
      console.log(res);
    })
  }

}
