import { Component, OnInit } from '@angular/core';
import { IAppState } from '../../../shared/app-state/app-state';
import { LocalStorageKeys } from '../../../shared/local-storage/local-storage-keys';
import { LocalStorageService } from '../../../shared/local-storage/local-storage.service';
import { LibraryFacadeService } from '../../domain/app-services/library-facade.service';
import { ILibraryItem } from '../../domain/models/libraryitem';

@Component({
  selector: 'app-libraryitem-list',
  templateUrl: './libraryitem-list.component.html',
  styleUrls: ['./libraryitem-list.component.css']
})
export class LibraryitemListComponent implements OnInit {

    currentUser = '';
    libraryItems: ILibraryItem[] = [];

    constructor(private service: LibraryFacadeService, private localStorageService: LocalStorageService) {

    }

    ngOnInit() {
        const appState: IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
        if (appState !== null) {
            this.currentUser = appState.userName;
            console.log(this.currentUser);
            this.getAllBooks(this.currentUser);
        }
    }


    private getAllBooks(username: string) {
        this.service.getBooks(username).subscribe((books) => {
            console.log(books);
            this.libraryItems = books;
        });
    }



}
