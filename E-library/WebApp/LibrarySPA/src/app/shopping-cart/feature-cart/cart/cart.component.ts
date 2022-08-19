import { compileDeclareInjectorFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/catalog/domain/models/book';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { LocalStorageKeys } from 'src/app/shared/local-storage/local-storage-keys';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { CartFacadeService } from '../../domain/app-services/cart-facade.service';
import { ICart } from '../../domain/models/ICart';
import { ICartItem } from '../../domain/models/ICartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentUser: string = '';
  cart: ICart;
  cartItems: ICartItem[] = [];
  constructor(private localStorageService: LocalStorageService, private cartService: CartFacadeService) { }

  ngOnInit(): void {
    const appState: IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
    if(appState !== null) {
      this.currentUser = appState.userName;
      console.log(this.currentUser);
      this.getCart(this.currentUser);
    }
  }

  onRemoveAll(username: string) {
      this.deleteCart(this.currentUser);
  }

  onRemove(username: string, id: string) {
      this.removeFromCart(this.currentUser, id);
  }

  private removeFromCart(username: string, id: string) {
    this.cartService.removeFromCart(username, id).subscribe((cartItems) => {
      this.cart.items = cartItems;
        this.getCart(username);
        location.reload();
    });
  }

  private getCart(username: string) {
    this.cartService.getCart(username).subscribe((cart) => 
    { 
      this.cart = cart;
      this.cartItems = cart.items;
      console.log(this.cart);
    });
  }

  private deleteCart(username: string) {
    this.cartService.deleteCart(username).subscribe((res) => 
    {
      console.log(res);
        this.getCart(username);
        location.reload();
    });
  }
}
