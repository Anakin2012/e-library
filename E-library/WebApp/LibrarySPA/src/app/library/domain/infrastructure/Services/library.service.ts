import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILibraryItem } from '../../models/libraryitem';

@Injectable({
    providedIn: 'root'
})
export class LibraryService {

    constructor(private http: HttpClient) { }

    public getBooks() {
        //treba da se odfiksira ovaj deo
        return this.http.get<{ [key: string]: ILibraryItem }>('http://localhost:8085/api/v1/Library/lukaTEST')
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


}
