using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using ShoppingCart.API.Entities;
using System;
using System.Threading.Tasks;

namespace ShoppingCart.API.Repositories
{
    public class CartRepo : ICartRepo
    {
        private readonly IDistributedCache _cache;

        public CartRepo(IDistributedCache cache)
        {
            _cache = cache ?? throw new ArgumentNullException(nameof(cache));
        }

        public async Task<Cart> GetCart(string username)
        {
            var cart = await _cache.GetStringAsync(username);
            if(string.IsNullOrEmpty(cart))
            {
                return null;
            }
            return JsonConvert.DeserializeObject<Cart>(cart);
        }

        public async Task<Cart> UpdateCart(Cart cart)
        {
            var stringCart = JsonConvert.SerializeObject(cart);
            await _cache.SetStringAsync(cart.Username, stringCart);
            return await GetCart(cart.Username);
        }

        public async Task DeleteCart(string username)
        {
            await _cache.RemoveAsync(username);
        }
    }
}
