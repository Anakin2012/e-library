import { Component, OnInit } from '@angular/core';
import { IOrder } from '../domain/models/IOrder';
import { OrderingFacadeService } from '../domain/app-services/ordering-facade.service';
import { LocalStorageService } from '../../shared/local-storage/local-storage.service';
import { IAppState } from '../../shared/app-state/app-state';
import { LocalStorageKeys } from '../../shared/local-storage/local-storage-keys';
import { IOrderItem } from '../domain/models/IOrderItem';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {

    currentUser = '';
    orders: IOrder[];
    constructor(public datepipe: DatePipe, private service: OrderingFacadeService, private localStorageService: LocalStorageService) { }

ngOnInit(): void {
    const appState: IAppState | null = this.localStorageService.get(LocalStorageKeys.AppState);
    if (appState !== null) {

        this.currentUser = appState.userName;
        console.log(this.currentUser);
        this.getOrders(this.currentUser);
    }

    }

    private getOrders(username: string) {
        this.service.getOrders(username).subscribe((orders) => {
            this.orders = orders;
            console.log(this.orders);
        });
    }

}
