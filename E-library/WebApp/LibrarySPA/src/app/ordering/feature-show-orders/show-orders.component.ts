import { Component, OnDestroy, OnInit } from '@angular/core';
import { IOrder } from '../domain/models/IOrder';
import { OrderingFacadeService } from '../domain/app-services/ordering-facade.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, Subscription, switchMap, take } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';


@Component({
    selector: 'app-show-orders',
    templateUrl: './show-orders.component.html',
    styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit, OnDestroy {

    username: string = '';
    subscription: Subscription;
    RouteParamObs;
    orders: IOrder[];
    public appState$: Observable<IAppState>
    constructor(private activatedRoute: ActivatedRoute, 
                public datepipe: DatePipe,
                private service: OrderingFacadeService,
                private appStateService: AppStateService)
    { 
        this.appState$ = this.appStateService.getAppState();
    }

    ngOnInit(): void {
        this.getOrders();        
    }

    private getOrders() {
        this.subscription=this.RouteParamObs = this.activatedRoute.paramMap.pipe(
            take(1),
            map((paramMap: ParamMap) => {
                this.username = paramMap.get('username');
                return this.username;
            }),
            switchMap((username: string) => this.service.getOrders(username))
        ).subscribe((orders) =>  {
            this.orders = orders;
            this.orders.sort((a, b) => { return <any>new Date(b.orderDate) - <any>new Date(a.orderDate) });
            console.log(this.orders);
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
