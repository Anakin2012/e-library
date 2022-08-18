using ShoppingCart.API.Entities;
using ShoppingCart.API.GrpcClientServices;
using ShoppingCart.API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingCart.API.Services
{
    public class CartService : ICartService
    {
        private readonly CatalogGrpcService _grpcService;
        private readonly ICartRepo _repository;

        public CartService(CatalogGrpcService grpcService, ICartRepo repository)
        {
            _grpcService = grpcService ?? throw new ArgumentNullException(nameof(grpcService));
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public async Task<List<CartItem>> AddBookToCart(string username, string bookId)
        {
            var book = await _grpcService.GetBookById(bookId);
            if (book.Book.IsAvailable == false)
            {
                return null;
            }

            Cart cart;
            if (await _repository.GetCart(username) != null)
            {
                cart = await _repository.GetCart(username);
            }
            else
            {
                cart = new Cart(username);
            }

            CartItem item = new CartItem();

            item.BookId = book.Book.Id;
            item.BookTitle = book.Book.Title;
            item.BookAuthor = book.Book.Author;
            item.BookGenre = book.Book.Genre;
            item.CoverImageFile = book.Book.CoverImageFile;
            item.IsPremium = book.Book.IsPremium;
            item.Language = book.Book.Language;

            cart.Items.Add(item);

            await _repository.UpdateCart(cart);

            return cart.Items;
        }

        public async Task<List<CartItem>> RemoveBookFromCart(string username, string bookId)
        {
            var book = await _grpcService.GetBookById(bookId);

            Cart cart;
            if (await _repository.GetCart(username) != null)
            {
                cart = await _repository.GetCart(username);
            }
            else
            {
                cart = new Cart(username);
            }

            CartItem item = new CartItem();
           
            item = cart.Items.Find(i => i.BookId == book.Book.Id);

            cart.Items.Remove(item); 
            
            await _repository.UpdateCart(cart);

            return cart.Items;

        }
    }
}
