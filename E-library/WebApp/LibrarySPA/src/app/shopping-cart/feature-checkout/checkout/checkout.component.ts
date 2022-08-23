import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Observable, switchMap, take } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { CartFacadeService } from '../../domain/app-services/cart-facade.service';
import { ICart } from '../../domain/models/ICart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('checkoutForm') form: NgForm;
  cart: ICart;
  public appState$ : Observable<IAppState>;

  constructor(private cartService: CartFacadeService,
              private appStateService: AppStateService,
              private toastService: NgToastService)
  {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
    this.getCartInfo();
  }

  getCartInfo() {
    this.getCart();
  }

  onCheckout(info: {street: string, city: string, state: string, country: string, zipCode: string, emailAddress: string}) 
  {
    this.checkout(info);
  }

  private getCart() {
    this.appStateService.getAppState().pipe(
      take(1),
      switchMap((appState) => this.cartService.getCart(appState.userName))
    ).subscribe((cart) => 
    {
      this.cart = cart;
      console.log(this.cart);
    }); 
  }

  private checkout(info: {street: string, city: string, state: string, country: string, zipCode: string, emailAddress: string})
  {
    if (Object.values(info).includes("")) {
      this.toastService.warning({detail: "Missing info", summary: "Please fill in all the fields!", duration: 3000});
    }
    else {
    this.appStateService.getAppState().pipe(
      take(1),
      switchMap((appState) => this.cartService.checkout(appState.userName, info))
      ).subscribe((res) => {
        console.log(res);
        this.toastService.success({detail: "Order confirmed!", summary: "Your order has been processed.", duration: 3000});
      });
    }
  }

}
