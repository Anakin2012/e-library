import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishListServiceFacade } from '../domain/app-services/wishlist-facade.service';
import { IWishlistItem } from '../domain/models/wishlistitem';
import { WishListItemComponent } from '../wish-list-item/wish-list-item.component';
@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  public itemList : IWishlistItem[] = []
  constructor(private service : WishListServiceFacade, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getAllBooks();
}


private getAllBooks() {
    this.service.GetList("username//").subscribe((items) => {
        console.log(items);
        this.itemList = items;
    });
}

//private updateList(bookId : string){
//  this.
//}

}
