import { IOrderItem } from "./IOrderItem";
import { DatePipe } from '@angular/common';

export interface IOrder {
    username: string;
    id: number;
    city: string;
    state: string;
    street: string;
    country: string;
    zipCode: string;
    emailAddress: string;
    orderDate: Date;
    orderItems: IOrderItem[];
}
