import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map, Observable, of, Subscription, switchMap, take } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { DataService } from 'src/app/shared/service/data.service';
import { WishListServiceFacade } from 'src/app/wishlist/domain/app-services/wishlist-facade.service';
import { IWish } from 'src/app/wishlist/domain/models/wishlist';
import { CartFacadeService } from '../../domain/app-services/cart-facade.service';
import { ICart } from '../../domain/models/ICart';
import { ICartItem } from '../../domain/models/ICartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart: ICart;
  cartItems: ICartItem[] = [];
  public appState$ : Observable<IAppState>;
  wishlist: IWish;
  username: string;
  sub: Subscription;

  constructor(private dataService: DataService,
              private cartService: CartFacadeService,
              private wishlistService: WishListServiceFacade,
              private appStateService: AppStateService,
              private toastService: NgToastService,
              private router: Router)
  {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
    this.sub = this.getCart();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRemoveAll() {
    this.removeAll();    
  }

  onRemove(id: string) {
      this.removeFromCart(id);
  }

  onWishList(id: string) {
    this.addToWishList(id);
    this.removeFromCart(id);
  }

  onCheck() {
    if (this.cart.totalItems === 0) {
      this.toastService.error({detail: "Nothing to checkout", summary: "Your cart is empty!", duration: 3000});
    }
    else {
      this.router.navigate(['/shopping-cart/checkout']);
    }
  }

  goToPage() {
    this.router.navigate(['/catalog/books']);
  }

  private addToWishList(id: string) {
    this.appState$.pipe(
      take(1),
      map((appState : IAppState) => {
        const username : string = appState.userName;
        this.username = username;
        return username;
      }),
      switchMap((username: string) => this.wishlistService.GetList(username)),
      switchMap((list: IWish) => {
        if (list.wishedBooks.find(b => b.bookId === id)) {
          this.toastService.warning({detail: "Already in wishlist", summary: "You have added this book to wishlist before", duration: 3000});
          return of(false);
        }
        else {
          return this.wishlistService.AddToWishList(this.username, id);
        }
      })
    ).subscribe((res: IWish | false) => {
      if (res === false) {
        console.log('OK, not added');
      }
      else {
        console.log(res);
        this.toastService.info({detail: "Saved in wishlist", summary: "The book has been added to your wishlist", duration: 3000});
      }
    });
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
    return this.appState$.pipe(
      take(1),
      switchMap((appState) => this.cartService.getCart(appState.userName))
    ).subscribe((cart) => 
    {
      this.cart = cart;
      this.cartItems = cart.items;
      console.log(this.cart);
    }); 
 }

  private removeAll() {
    if (this.cartItems.length === 0) {
      this.toastService.warning({detail: "Nothing to remove", summary: "Your cart is empty", duration: 3000});
    }
    else {
      for (let i = 0; i < this.cart.items.length; i++) {
        let id = this.cart.items[i].bookId;
        this.removeFromCart(id);
      } 
    }
  }
}
