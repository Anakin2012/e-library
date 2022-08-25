import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderingComponent } from './ordering.component';
import { ShowOrdersComponent } from './feature-show-orders/show-orders.component';
import { DatePipe } from '@angular/common';
import { FeatureShowUsersComponent } from './feature-show-users/feature-show-users.component';
import { FeatureOrdersComponent } from './feature-orders/feature-orders.component';

const routes: Routes = [
    { path: ':username/orders', component: ShowOrdersComponent },
    { path: 'users', component: FeatureShowUsersComponent },
    { path: 'orders', component: FeatureOrdersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderingRoutingModule { }
