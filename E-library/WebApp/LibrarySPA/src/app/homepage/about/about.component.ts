import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BooksFacadeService } from 'src/app/catalog/domain/app-services/books-facade.service';
import { IBook } from 'src/app/catalog/domain/models/book';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  public appState$ : Observable<IAppState>;
  popularBooks: IBook[] = [];
  sub1: Subscription;
  sub2: Subscription;
  roles: string | string[];

  constructor(private router: Router, 
              private appStateService: AppStateService,
              private booksService: BooksFacadeService)
  {
    this.appState$ = this.appStateService.getAppState();
  }

  ngOnInit(): void 
  {
    this.sub1 = this.appState$.subscribe((appState) => {
      this.roles = appState.roles;
    });

    if (this.roles) {
      this.sub2 = this.getPopularBooks();
    }
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  goToPage() {
      this.router.navigate(['identity']);
  }
  
  private getPopularBooks() {
    return this.booksService.getBooksByRentCount(3).subscribe((books: IBook[]) => {
      console.log(books);
      this.popularBooks = books;
    });
  }

}
