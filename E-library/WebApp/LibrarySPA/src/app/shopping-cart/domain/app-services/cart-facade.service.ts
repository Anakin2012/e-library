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

  public getCart(username: string): Observable<ICart> {
    return this.cartService.getCart(username);
    }

    public getCartTotalItems(username: string): Observable<number> {
        return this.cartService.getCartTotalItems(username);
    }

  public deleteCart(username: string) {
    return this.cartService.deleteCart(username);
  }

  public removeFromCart(username: string, id: string) : Observable<ICartItem[]> {
    return this.cartService.removeFromCart(username, id);
  }
}
