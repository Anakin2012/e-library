import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './feature-cart/cart/cart.component';
import { CheckoutComponent } from './feature-checkout/checkout/checkout.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
