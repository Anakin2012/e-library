import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../infrastructure/cart.service';
import { ICart } from '../models/ICart';
import { ICartItem } from '../models/ICartItem';

@Injectable({
  providedIn: 'root'
})
export class CartFacadeService {

  constructor(private cartService: CartService) { }

  public checkout(username: string, body) {
    return this.cartService.checkout(username, body);
  }

  public getCart(username: string): Observable<ICart> {
    return this.cartService.getCart(username);
    }

  public deleteCart(username: string) {
    return this.cartService.deleteCart(username);
  }

  public removeFromCart(username: string, id: string) : Observable<ICartItem[]> {
    return this.cartService.removeFromCart(username, id);
  }
}
