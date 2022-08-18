import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToListComponent } from './add-to-list/add-to-list.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { WishListItemComponent } from './wish-list-item/wish-list-item.component';
import { WishlistComponent } from './wishlist.component';

const routes: Routes = [
  {path:'', component:WishlistComponent, 
  children:[{path : 'itemlist', component:ItemlistComponent},
    {path:'add-to-list', component:AddToListComponent}]},
  {path:'itemlist', component : ItemlistComponent},
  {path:'wish-list-item', component : WishListItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }
