using System;
using System.Collections.Generic;

namespace ShoppingCart.API.Entities
{
    public class Cart
    {
        public string Username { get; set; }
        public List<CartItem> Items { get; set; }

        public Cart()
        {
        }

        public Cart(string username)
        {
            Username = username ?? throw new ArgumentNullException(nameof(username));
        }

        public decimal TotalBooks
        {
            get
            {
                return Items.Count;
            }

        }
    }
}
