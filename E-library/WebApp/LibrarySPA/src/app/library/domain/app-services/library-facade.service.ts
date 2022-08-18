import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryService } from '../infrastructure/Services/library.service';
import { ILibraryItem } from '../models/libraryitem';

@Injectable({
    providedIn: 'root'
})
export class LibraryFacadeService {

    constructor(private libraryService: LibraryService) { }

    public getBooks(username: string) {
        return this.libraryService.getBooks(username);
    }

}
