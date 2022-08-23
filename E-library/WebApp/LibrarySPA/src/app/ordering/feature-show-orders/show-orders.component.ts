import { Component, OnInit } from '@angular/core';
import { IOrder } from '../domain/models/IOrder';
import { OrderingFacadeService } from '../domain/app-services/ordering-facade.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap, take } from 'rxjs';


@Component({
    selector: 'app-show-orders',
    templateUrl: './show-orders.component.html',
    styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {

    username: string = '';
    RouteParamObs;
    orders: IOrder[];
    constructor(private activatedRoute: ActivatedRoute, 
                public datepipe: DatePipe,
                private service: OrderingFacadeService)
    { }

    ngOnInit(): void {
        this.getOrders();        
    }

    private getOrders() {
        this.RouteParamObs = this.activatedRoute.paramMap.pipe(
            take(1),
            map((paramMap: ParamMap) => {
                this.username = paramMap.get('username');
                return this.username;
            }),
            switchMap((username: string) => this.service.getOrders(username))
        ).subscribe((orders) =>  {
            this.orders = orders;
            console.log(this.orders);
        })
    }

}
