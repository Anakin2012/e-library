import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../models/ICart';
import { ICartItem } from '../models/ICartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly url: string = 'http://localhost:8003/api/v1/Cart';

  constructor(private http: HttpClient) { }

  public checkout(username: string, body: Object) {
    return this.http.post(`${this.url}/Checkout/${username}`, body);
  }

  public getCart(username: string): Observable<ICart> {
    return this.http.get<ICart>(`${this.url}/GetCart/${username}`);
  }

  public deleteCart(username: string) {
    return this.http.delete(`${this.url}/DeleteCart/${username}`)
  }

  public updateCart(body: Object) : Observable<ICart> {
    return this.http.put<ICart>(`${this.url}/UpdateCart`, body);
  }

  public addToCart(username: string, id: string) : Observable<ICartItem[]>{
    return this.http.put<ICartItem[]>(`${this.url}/AddBookToCart/${username}/${id}`, null);
  }

  public removeFromCart(username: string, id: string) : Observable<ICartItem[]>{
    return this.http.put<ICartItem[]>(`${this.url}/RemoveBookFromCart/${username}/${id}`, null);
  }
}
