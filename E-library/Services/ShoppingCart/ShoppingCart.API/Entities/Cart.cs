using System;
using System.Collections.Generic;

namespace ShoppingCart.API.Entities
{
    public class Cart
    {
        public string Username { get; set; }
        List<CartItem> Items { get; set; }

        public Cart()
        {
        }

        public Cart(string username)
        {
            Username = username ?? throw new ArgumentNullException(nameof(username));
        }

        public decimal cumulativePrice
        {
            get
            {
                decimal cumulativePrice = 0;
                foreach (var item in Items)
                {
                    cumulativePrice += item.Price * item.Quantity;
                }
                return cumulativePrice;
            }
        }
    }
}
