import { IOrderItem } from "./IOrderItem";
import { DatePipe } from '@angular/common';

export interface IOrder {
    Id : Number;
    Street : string;
    City : string;
    State : string;
    Country : string;
    ZipCode : string;
    EmailAddress : string;
    OrderDate : Date;
    CustomerId : string;
    Username : string;
    OrderItems : IOrderItem[];
}

//OrderDTO
//int Id { get; set; }
// string Street { get; set; }
// string City { get; set; }
//          string State { get; set; }
//          string Country { get; set; }
//          string ZipCode { get; set; }
//          string EmailAddress { get; set; }

//          DateTime OrderDate { get;  set; }

        // Relevant information from Order
//          string CustomerId { get; set; }
//          string Username { get; set; }
//          IEnumerable<OrderItemDTO> OrderItems { get; set; }