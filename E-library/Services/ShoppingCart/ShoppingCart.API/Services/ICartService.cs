using ShoppingCart.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingCart.API.Services
{
    public interface ICartService
    {
        public Task<List<CartItem>> AddBookToCart(string username, string bookId);
        public Task<List<CartItem>> RemoveBookFromCart(string username, string bookId);

    }
}
