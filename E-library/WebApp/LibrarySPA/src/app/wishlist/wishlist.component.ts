import { Component, OnInit } from '@angular/core';
import { WishListServiceFacade } from './domain/app-services/wishlist-facade.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private service:WishListServiceFacade) { }

  ngOnInit(): void {
  }
public deleteList(){
  this.service.DeleteList("username");
  this.service.GetList("username").subscribe((list)=>{
    console.log(list);
  });
}
}
