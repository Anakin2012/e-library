import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILibraryItem } from '../../models/libraryitem';

@Injectable({
    providedIn: 'root'
})
export class LibraryService {
    private readonly url: string = 'http://localhost:8085/api/v1/Library';

    constructor(private http: HttpClient) { }

    public getBooks(username: string) {
        //treba da se odfiksira ovaj deo
        return this.http.get<{ [key: string]: ILibraryItem }>(`${this.url}/GetBooksForUser/` + username)
            .pipe(map((res) => {
                const libItems = [];
                for (const key in res) {
                    if (res.hasOwnProperty(key)) {
                        libItems.push({ ...res[key] })
                    }
                }
                return libItems;
            }))

    }

    public removeFromLibrary(libraryItemId: string): Observable<ILibraryItem[]> {
        return this.http.put<ILibraryItem[]>(`${this.url}/RemoveBookFromLibrary/${libraryItemId}`, null);
    }


}
