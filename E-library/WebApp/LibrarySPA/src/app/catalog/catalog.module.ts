import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { BookDetailsComponent } from './feature-book-details/book-details.component';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './feature-show-books/book-list/book-list.component';
import { BooksService } from './domain/infrastructure/Services/books.service';
import { FormsModule } from '@angular/forms';
import { CatalogRoutingModule } from './catalog-routing.module';
import { NavComponent } from '../navigation/nav/nav.component';
import { SearchComponent } from './feature-search/search/search.component';
import { AdminOptionsComponent } from './feature-admin/admin-options/admin-options.component';

@NgModule({
  declarations: [
    CatalogComponent,
    BookDetailsComponent,
    BookListComponent,
    SearchComponent,
    AdminOptionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CatalogRoutingModule
  ],
  exports : [
    SearchComponent
  ],
  providers: [BooksService, NavComponent]
})
export class CatalogModule { }
