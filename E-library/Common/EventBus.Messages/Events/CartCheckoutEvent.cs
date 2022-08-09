﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.Messages.Events
{
    public class CartItem
    {
        public string BookTitle { get; set; }
        public string BookId { get; set; }
       // public string PictureUrl { get; set; }
    }
    public class CartCheckoutEvent : IntegrationBaseEvent
    {

        // Address
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string EmailAddress { get; set; }

        // Order
        public string MemberId { get; set; }
        public string MemberUsername { get; set; }
        public IEnumerable<CartItem> OrderItems { get; set; }
    }
}
