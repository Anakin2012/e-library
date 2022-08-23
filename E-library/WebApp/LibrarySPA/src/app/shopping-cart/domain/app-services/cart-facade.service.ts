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

  public updateCart(body) : Observable<ICart>{
    return this.cartService.updateCart(body);
  }

  public deleteCart(username: string) {
    return this.cartService.deleteCart(username);
  }

  public addToCart(username: string, id: string) {
    return this.cartService.addToCart(username, id);
  }

  public removeFromCart(username: string, id: string) : Observable<ICartItem[]> {
    return this.cartService.removeFromCart(username, id);
  }

  public removeAll(username : string) : Observable <ICart> {
    return this.cartService.removeAll(username);
  }
}
