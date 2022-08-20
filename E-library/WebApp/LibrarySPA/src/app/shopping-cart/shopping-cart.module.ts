import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CartComponent } from './feature-cart/cart/cart.component';
import { CheckoutComponent } from './feature-checkout/checkout/checkout.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    FormsModule
  ]
})
export class ShoppingCartModule { }
