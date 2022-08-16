import { Component, OnInit } from '@angular/core';
import { LibraryFacadeService } from '../../domain/app-services/library-facade.service';
import { ILibraryItem } from '../../domain/models/libraryitem';

@Component({
  selector: 'app-libraryitem-list',
  templateUrl: './libraryitem-list.component.html',
  styleUrls: ['./libraryitem-list.component.css']
})
export class LibraryitemListComponent implements OnInit {

    libraryItems: ILibraryItem[] = [];

    constructor(private service: LibraryFacadeService) {

    }

    ngOnInit() {
        this.getAllBooks();
    }


    private getAllBooks() {
        this.service.getBooks().subscribe((books) => {
            console.log(books);
            this.libraryItems = books;
        });
    }



}
