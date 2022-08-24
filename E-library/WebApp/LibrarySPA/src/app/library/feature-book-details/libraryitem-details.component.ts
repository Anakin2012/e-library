import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ILibraryItem } from '../domain/models/libraryitem';
import { BooksFacadeService } from '../../catalog/domain/app-services/books-facade.service';
import { IBook } from '../../catalog/domain/models/book';
import { map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-libraryitem-details',
  templateUrl: './libraryitem-details.component.html',
  styleUrls: ['./libraryitem-details.component.css']
})
export class LibraryitemDetailsComponent implements OnInit {

    public book: IBook;
    bookId;
    RouteParamObs;

    constructor(private activatedRoute: ActivatedRoute, private service: BooksFacadeService) { }

    ngOnInit(): void {

        this.RouteParamObs = this.activatedRoute.paramMap.pipe(
            take(1),
            map((param: ParamMap) => {
                this.bookId = param.get('id');  
                return this.bookId;
            }),
            switchMap((id: string) => this.service.getBook(this.bookId))
            ).subscribe((book) => {
                console.log(book);
                this.book = book;
            });  
    }
}


