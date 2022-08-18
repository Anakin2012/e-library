import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToListComponent } from './add-to-list/add-to-list.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { WishlistComponent } from './wishlist.component';
const routes: Routes = [
  {path:'', component:WishlistComponent, 
  children:[{path : 'itemlist', component:ItemlistComponent},
    {path:'add-to-list', component:AddToListComponent}]},
  {path:'itemlist', component : ItemlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }
