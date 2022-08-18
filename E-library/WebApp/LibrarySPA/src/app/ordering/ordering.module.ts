import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderingComponent } from './ordering.component';
import { ShowOrdersComponent } from './feature-show-orders/show-orders.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderingRoutingModule } from './ordering-routing.module';



@NgModule({
  declarations: [
    OrderingComponent,
    ShowOrdersComponent
  ],
  imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      OrderingRoutingModule
    ],
    providers: [DatePipe]

})
export class OrderingModule { }