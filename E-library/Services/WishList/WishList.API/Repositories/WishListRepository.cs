using Microsoft.Extensions.Caching.Distributed;
using System.Threading.Tasks;
using WishList.API.Entities;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace WishList.API.Repositories
{
    public class WishListRepository : IWishListRepository
    {
        private readonly IDistributedCache _cache;

        public WishListRepository(IDistributedCache cache)
        {
            _cache = cache ?? throw new System.ArgumentNullException(nameof(cache));
        }

        public async Task<WishBookList> GetList(string username)
        {
            var wishList = await _cache.GetStringAsync(username);
            if (string.IsNullOrEmpty(wishList)) { 
                return null;
            }
            return JsonConvert.DeserializeObject<WishBookList>(wishList);
        }

        public async Task<WishBookList> UpdateList(WishBookList list)
        {
            var listString = JsonConvert.SerializeObject(list);
            await _cache.SetStringAsync(list.Username, listString);
            return await GetList(list.Username);
        }

        

        public async Task DeleteList(string username)
        {
            await _cache.RemoveAsync(username);
        }

        public async Task<WishBookList> RemoveItemFromWishlist(string username, string bookId)
        {
            WishBookList list;
            if (this.GetList(username) != null) {
                list = await GetList(username);
            }
            else
            {
                list = new WishBookList(username);
            }

            list.WishedBooks.Remove(list.WishedBooks.Find(item => item.BookId == bookId));
            await UpdateList(list);
            return list;
        }
    }
}
