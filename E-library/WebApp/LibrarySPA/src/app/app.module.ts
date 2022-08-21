import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './homepage/header/header.component';
import { FormsModule} from '@angular/forms';
import { BooksComponent } from './homepage/books/books.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthenticationInterceptor } from './shared/interceptors/authentication.interceptor';
import { NgToastModule } from 'ng-angular-popup';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    HeaderComponent,
    BooksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgToastModule
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass : AuthenticationInterceptor, multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
