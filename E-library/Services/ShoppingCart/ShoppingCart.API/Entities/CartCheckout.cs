using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingCart.API.Entities
{
    public class CartCheckout
    {
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
