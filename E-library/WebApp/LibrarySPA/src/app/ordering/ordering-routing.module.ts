import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderingComponent } from './ordering.component';
import { ShowOrdersComponent } from './feature-show-orders/show-orders.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [
    { path: 'orders', component: ShowOrdersComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderingRoutingModule { }
