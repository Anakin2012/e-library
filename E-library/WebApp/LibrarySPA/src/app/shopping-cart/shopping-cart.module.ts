import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CartComponent } from './feature-cart/cart/cart.component';
import { CheckoutComponent } from './feature-checkout/checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { NavComponent } from '../nav/nav.component';


@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    FormsModule,
  ],
  providers: [NavComponent]
})
export class ShoppingCartModule { }
