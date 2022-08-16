import { Component, OnInit } from '@angular/core';
import { BooksFacadeService } from '../../domain/app-services/books-facade.service';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.css']
})
export class AdminOptionsComponent implements OnInit {

  constructor(private service: BooksFacadeService) { }

  ngOnInit(): void {
  }

  onBookCreate(books: {title: string, author: string, genre: string, language:string, description: string, 
                      coverImageFile: string, isAvailable: boolean, isPremium: boolean, rentCount: number, id: string}) {
      if (books.isPremium != true){
        books.isPremium = false;
      }
      books.isAvailable = true;
      books.rentCount = 0;
      books.id = "string";

      console.log(books);
      this.service.createBook(books).subscribe((res) => {
        console.log(res);
      });
  }

}
