import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IOrder } from '../../models/IOrder';

@Injectable({
    providedIn: 'root'
})
export class OrderingService {

    constructor(private http: HttpClient) { }
    url = 'http://localhost:8004/api/v1/Order';
    public getOrders(username:string) {
        //treba da se odfiksira ovaj deo
        return this.http.get<{ [key: string]: IOrder}>(`${this.url}/GetOrdersByUsername/${username}`)
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

    public getAllOrders(): Observable<IOrder[]> {
        return this.http.get<IOrder[]>(`${this.url}/GetAllOrders/`);
    }
}
