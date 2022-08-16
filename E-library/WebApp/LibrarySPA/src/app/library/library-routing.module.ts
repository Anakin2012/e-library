import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { LibraryitemDetailsComponent } from './feature-book-details/libraryitem-details.component';
import { LibraryitemListComponent } from './feature-show-items/items-list/libraryitem-list.component';

const routes: Routes = [
    { path: 'items', component: LibraryComponent },
    { path: 'item/:id', component: LibraryitemDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LibraryRoutingModule { }
