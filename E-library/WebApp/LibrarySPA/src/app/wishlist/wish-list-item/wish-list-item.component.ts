import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishListServiceFacade } from '../domain/app-services/wishlist-facade.service';
import { IWishlistItem } from '../domain/models/wishlistitem';

@Component({
  selector: 'app-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css']
})
export class WishListItemComponent implements OnInit {
  public item : IWishlistItem;
  RouteParamObs;
  bookId;
  constructor(private service:WishListServiceFacade, private activatedRoute:ActivatedRoute) { }

  
  ngOnInit(): void {
    
  }

}
