import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { IAppState } from '../../../shared/app-state/app-state';
import { AppStateService } from '../../../shared/app-state/app-state.service';
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

    libraryItems: ILibraryItem[] = [];
    public appState$: Observable<IAppState>;

    constructor(private service: LibraryFacadeService, private appStateService: AppStateService) {
        this.appState$ = this.appStateService.getAppState();
    }

    ngOnInit() {
        this.getAllBooks();
    }


    private getAllBooks() {
        this.appStateService.getAppState().pipe(
            switchMap((appState) => this.service.getBooks(appState.userName))
        ).subscribe((libraryItems) => {
            this.libraryItems = libraryItems;
            console.log(this.libraryItems);
        });
    }



}
