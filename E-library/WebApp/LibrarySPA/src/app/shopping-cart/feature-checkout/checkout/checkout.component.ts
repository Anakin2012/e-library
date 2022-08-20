import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { LocalStorageKeys } from 'src/app/shared/local-storage/local-storage-keys';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { CartFacadeService } from '../../domain/app-services/cart-facade.service';

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

  constructor(private localStorageService: LocalStorageService, private cartService: CartFacadeService) { }

  ngOnInit(): void {
    const appState: IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
    if(appState !== null) {
      this.currentUser = appState.userName;
      this.currentName = appState.firstName;
      this.surname = appState.lastName;
      console.log(this.currentUser);
      console.log(this.currentName);
    }
  }

  onCheckout(info: {street: string, city: string, state: string, country: string, zipCode: string, emailAddress: string}) {
    //this.checkout()
  }

  private checkout(username: string) {
   // this.cartService.checkout(username);
  }

}
