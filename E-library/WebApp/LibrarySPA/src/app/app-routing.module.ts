import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { BookComponent } from './book/book.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ContainerComponent } from './Container/container.component';
import { HomepageComponent } from './homepage/homepage.component';

const appRoute: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: HomepageComponent},
  {path: 'Books', component: CatalogComponent}, // catalog
  {path: 'Basket', component: BasketComponent},
<<<<<<< Updated upstream
=======
  { path: 'identity', loadChildren: () => import('./identity/identity.module').then(m => m.IdentityModule) },
  {path: 'Books/:id', component: BookDetailsComponent}
>>>>>>> Stashed changes
]

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
