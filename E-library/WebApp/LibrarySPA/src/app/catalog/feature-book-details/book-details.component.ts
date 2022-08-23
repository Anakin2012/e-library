import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { DataService } from 'src/app/shared/service/data.service';
import { CartFacadeService } from 'src/app/shopping-cart/domain/app-services/cart-facade.service';
import { CartService } from 'src/app/shopping-cart/domain/infrastructure/cart.service';
import { ICartItem } from 'src/app/shopping-cart/domain/models/ICartItem';
import { WishListServiceFacade } from 'src/app/wishlist/domain/app-services/wishlist-facade.service';
import { BooksFacadeService } from '../domain/app-services/books-facade.service';
import { IBook } from '../domain/models/book';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  public book: IBook;
  bookId;
  RouteParamObs;
  cartItems: ICartItem[];
  public appState$ : Observable<IAppState>;

  constructor(private dataService: DataService, 
              private activatedRoute: ActivatedRoute, 
              private service: BooksFacadeService, 
              private appStateService: AppStateService,
              private cartService: CartFacadeService,
              private wishlistService : WishListServiceFacade)
  {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void {
    this.RouteParamObs = this.activatedRoute.paramMap.pipe(
      map((paramMap: ParamMap) => {
        this.bookId = paramMap.get('id');
        return this.bookId;
      }),
      switchMap((id: string) => this.service.getBook(id))
      ).subscribe((book) => {
        console.log(book);
        this.book = book;
      })
  }

  onAddToCart(id: string) {
    this.addToCart(id);
  }


  private addToCart(id: string) {

    this.appStateService.getAppState().pipe(
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username: string) => this.cartService.addToCart(username, id))
    ).subscribe((cartitems) => {
      console.log(cartitems);
      this.cartItems = cartitems;
      this.dataService.notifyOther({refresh: true});
    });
  }
  onAddToWishlist(id:string){
    this.addWishlist(id);
  }
  private addWishlist(id:string) {
    
    this.appStateService.getAppState().pipe(
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username: string) => this.wishlistService.AddToWishList(username, id))
    ).subscribe((res) => {
      console.log(res);
      this.dataService.notifyOther({refresh : true});
    });
  }

  public onIsInWishlist(bookId : string) : boolean{
    return this.isInWishlist(bookId);
  }
  private isInWishlist(bookId: string) : boolean{
    var ind : boolean = false;
    this.appStateService.getAppState().pipe(
      map((appState : IAppState) => {
        const username : string = appState.userName;
        return username;
      }),
      switchMap((username : string) => {
        return this.wishlistService.GetList(username);
      })
    ).subscribe((list) => {
      for(let item of list.wishedBooks){
        if(item.bookId === bookId)
        ind = true;
      }
    })
    return ind;
  }
}
