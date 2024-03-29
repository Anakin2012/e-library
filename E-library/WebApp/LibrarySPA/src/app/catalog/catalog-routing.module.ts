import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { AdminOptionsComponent } from './feature-admin/admin-options/admin-options.component';
import { BookDetailsComponent } from './feature-book-details/book-details.component';
import { BookListComponent } from './feature-show-books/book-list/book-list.component';

const routes: Routes = [
  { path: 'books', component: CatalogComponent},
  { path: 'books/:id', component: BookDetailsComponent},
  { path: 'admin', component: AdminOptionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
