import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';
import { WishListItemComponent } from './wish-list-item/wish-list-item.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { RouterModule } from '@angular/router';
import { AddToListComponent } from './add-to-list/add-to-list.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    WishlistComponent,
    ItemlistComponent,
    AddToListComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    RouterModule,
  ]
})
export class WishlistModule { }
