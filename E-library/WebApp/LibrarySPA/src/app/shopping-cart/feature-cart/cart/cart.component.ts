import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { map, Observable, switchMap, take } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { DataService } from 'src/app/shared/service/data.service';
import { CartFacadeService } from '../../domain/app-services/cart-facade.service';
import { ICart } from '../../domain/models/ICart';
import { ICartItem } from '../../domain/models/ICartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: ICart;
  cartItems: ICartItem[] = [];
  public appState$ : Observable<IAppState>;

  constructor(private dataService: DataService,
              private cartService: CartFacadeService,
              private appStateService: AppStateService,
              private toastService: NgToastService)
  {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
    this.getCart();
  }

  onRemoveAll() {
      this.deleteCart();
  }

  onRemove(id: string) {
      this.removeFromCart(id);
  }

  onCheck() {
    if (this.cart.totalItems === 0) {
      this.toastService.error({detail: "Nothing to checkout", summary: "Your cart is empty!", duration: 3000});
    }
  }

  private removeFromCart(id: string) {
    this.appState$.pipe(
      take(1),
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username: string) => this.cartService.removeFromCart(username, id)),
      map((cartItems: ICartItem[]) => {
        this.cartItems = cartItems;
        this.cart.items = cartItems;
        return this.cart;
      }),
      switchMap((cart: ICart) => this.cartService.updateCart(cart))
    ).subscribe((cart) => {
      this.cart = cart;
      this.dataService.notifyOther({refresh: true});
    });
  }

  private getCart() {
    this.appState$.pipe(
      take(1),
      switchMap((appState) => this.cartService.getCart(appState.userName))
    ).subscribe((cart) => 
    {
      this.cart = cart;
      this.cartItems = cart.items;
      console.log(this.cart);
    }); 
 }

  private deleteCart() {

    this.appState$.pipe(
      take(1),
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username: string) => this.cartService.removeAll(username)),
    //  map((cart : ICart) => {
      //  this.cartItems = cart.items;
      //  this.cart.items = cart.items;
      //  return cart;
     // })
      switchMap((cart: ICart) => this.cartService.updateCart(cart))
    ).subscribe((cart) => {
      this.cart = cart;
      this.cartItems = cart.items;
      //this.dataService.notifyOther({refresh: true});
    });
    
  }
}
