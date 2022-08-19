import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';
import { WishListItemComponent } from './wish-list-item/wish-list-item.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { RouterModule } from '@angular/router';
import { AddToListComponent } from './add-to-list/add-to-list.component';
import { RouterLink } from '@angular/router';
import { SearchComponent } from '../catalog/feature-search/search/search.component';
import { CatalogRoutingModule } from '../catalog/catalog-routing.module';
import { WishListService } from './domain/infrastructure/wishlist-service';
import { CatalogModule } from '../catalog/catalog.module';
@NgModule({
  declarations: [
    WishlistComponent,
    ItemlistComponent,
    AddToListComponent,
    WishListItemComponent,
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    RouterModule,
    CatalogModule
  ],
  providers : [
    WishListService
  ]
})
export class WishlistModule { }
