import { Component, OnInit } from '@angular/core';
import { IOrder } from '../domain/models/IOrder';
import { OrderingFacadeService } from '../domain/app-services/ordering-facade.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-show-orders',
    templateUrl: './show-orders.component.html',
    styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {

    username = '';
    RouteParamObs;
    orders: IOrder[];
    constructor(private activatedRoute: ActivatedRoute, public datepipe: DatePipe, private service: OrderingFacadeService) { }

    ngOnInit(): void {

        this.RouteParamObs = this.activatedRoute.paramMap.subscribe((param) => {
            this.username = param.get('username');
            this.getOrders(this.username);
        });
    }

    private getOrders(username: string) {
        this.service.getOrders(username).subscribe((orders) => {
            this.orders = orders;
            console.log(this.orders);
        });
    }

}
