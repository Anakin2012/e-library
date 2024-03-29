﻿using System;
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
            Items = new List<CartItem>();
        }

        public decimal TotalItems
        {
            get
            {
                return Items.Count;
            }

        }
    }
}
