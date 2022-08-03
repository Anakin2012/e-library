using System;
using System.Collections.Generic;

namespace ShoppingCart.API.Entities
{
    public class Cart
    {
        public string Username { get; set; }
        List<CartItem> Items { get; set; } = new List<CartItem>();

        public Cart()
        {
        }

        public Cart(string username)
        {
            Username = username ?? throw new ArgumentNullException(nameof(username));
        }

        public List<CartItem> deleteCartItem(string bookId)
        {
            Items.RemoveAll(i => i.bookId == bookId);
            return Items;
        }

    }
}
