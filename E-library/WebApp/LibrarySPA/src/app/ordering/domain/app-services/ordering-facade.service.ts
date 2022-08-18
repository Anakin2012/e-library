import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderingService } from '../infrastructure/Services/ordering.service';

@Injectable({
    providedIn: 'root'
})
export class OrderingFacadeService {

    constructor(private orderingService: OrderingService) { }

    public getOrders(username: string) {
        return this.orderingService.getOrders(username);
    }

}
