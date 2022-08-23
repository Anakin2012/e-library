import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable, switchMap } from 'rxjs';
import { IAppState } from '../../../shared/app-state/app-state';
import { AppStateService } from '../../../shared/app-state/app-state.service';
import { DataService } from '../../../shared/service/data.service';
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

    constructor(private toastService: NgToastService, private service: LibraryFacadeService, private appStateService: AppStateService, private dataService: DataService) {
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

    onRemoveFromLibrary(libraryItemId: string) {
        this.removeFromLibrary(libraryItemId);
    }


    private removeFromLibrary(libraryItemId: string) {
        this.service.removeFromLibrary(libraryItemId).subscribe((books) => {
            this.libraryItems = books;
        })
        this.toastService.info({ detail: "Book is returned", summary: "Hope you enjoyed it! ", duration: 3000 });
    }



}
