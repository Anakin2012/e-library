import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishListServiceFacade } from '../domain/app-services/wishlist-facade.service';
import { IWishlistItem } from '../domain/models/wishlistitem';
import { WishlistComponent } from '../wishlist.component';
import { LibraryitemListComponent } from 'src/app/library/feature-show-items/items-list/libraryitem-list.component';
@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.css']
})
export class AddToListComponent implements OnInit {
  public RecByAuthor : IWishlistItem[] = [];
  public RecByGenre : IWishlistItem[] = [];
  public RecRandom : IWishlistItem[] = [];
  constructor(private service : WishListServiceFacade, private activatedRoute:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.init();
  }

  private init(){
    this.service.GetRecommendationsByAuthor("username").subscribe((list)=>
    {this.RecByAuthor = list;
     console.log(list);});
     this.service.GetRecommendationsByGenre("username").subscribe((list)=>
     {this.RecByGenre = list;
      console.log(list);});
    this.RecRandom = [];

  
    }
    public AddBook(bookId : string){
      this.service.AddToWishList("username", bookId);
      console.log();
    }
}
