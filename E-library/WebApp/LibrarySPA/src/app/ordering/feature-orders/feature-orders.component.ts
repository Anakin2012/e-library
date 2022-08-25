import { Component, OnInit } from '@angular/core';
import { OrderingFacadeService } from '../domain/app-services/ordering-facade.service';
import { IOrder } from '../domain/models/IOrder';

@Component({
  selector: 'app-feature-orders',
  templateUrl: './feature-orders.component.html',
  styleUrls: ['./feature-orders.component.css']
})
export class FeatureOrdersComponent implements OnInit {

    allOrders: IOrder[] = [];
    constructor(private orderingService: OrderingFacadeService) { }

    ngOnInit(): void {
        this.getAllOrders();
    }

    private getAllOrders() {
        this.orderingService.getAllOrders().subscribe((orders) => {
            console.log(orders);
            this.allOrders = orders;
            this.allOrders.sort((a, b) => { return <any>new Date(b.orderDate) - <any>new Date(a.orderDate) } );
        });
    }

}
