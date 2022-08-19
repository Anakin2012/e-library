import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IOrder } from '../../models/IOrder';

@Injectable({
    providedIn: 'root'
})
export class OrderingService {

    constructor(private http: HttpClient) { }

    public getOrders(usename:string) {
        //treba da se odfiksira ovaj deo
        return this.http.get<{ [key: string]: IOrder }>('http://localhost:8004/api/v1/Order/' + usename)
            .pipe(map((res) => {
                const orders = [];
                for (const key in res) {
                    if (res.hasOwnProperty(key)) {
                        orders.push({ ...res[key] })
                    }
                }
                return orders;
            }))

    }


}
