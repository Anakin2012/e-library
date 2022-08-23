import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryService } from './domain/infrastructure/Services/library.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibraryRoutingModule } from './library-routing.module';
import { NavComponent } from '../navigation/nav/nav.component';
import { LibraryComponent } from './library.component';
import { LibraryitemDetailsComponent } from './feature-book-details/libraryitem-details.component';
import { LibraryitemListComponent } from './feature-show-items/items-list/libraryitem-list.component';



@NgModule({
  declarations: [
    LibraryComponent,
    LibraryitemDetailsComponent,
    LibraryitemListComponent
  ],
  imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      LibraryRoutingModule
  ],
  providers: [LibraryService, NavComponent]
})
export class LibraryModule { }
