import { IOrderItem } from "./IOrderItem";
import { DatePipe } from '@angular/common';

export interface IOrder {
    id : Number;
    street : string;
    city : string;
    state : string;
    country : string;
    zipCode : string;
    emailAddress : string;
    orderDate : Date;
    customerId : string;
    username : string;
    orderItems : IOrderItem[];
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