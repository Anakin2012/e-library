import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './catalog/feature-book-details/book-details.component';
import { HomepageComponent } from './homepage/homepage.component';

const appRoute: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: HomepageComponent},
  {path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)}, // catalog
    { path: 'identity', loadChildren: () => import('./identity/identity.module').then(m => m.IdentityModule) },
    { path: 'library', loadChildren: () => import('./library/library.module').then(m=>m.LibraryModule) }

]

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
