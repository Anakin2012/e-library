using Microsoft.Extensions.Caching.Distributed;
using System.Threading.Tasks;
using WishList.API.Entities;

namespace WishList.API.Repositories
{
    public class WishListRepo : IWishListRepo
    {
        private readonly IDistributedCache _cache;
        
        Task<WishBookList> IWishListRepo.GetList(string username)
        {
            throw new System.NotImplementedException();
        }

        public Task<WishBookList> UpdateList(WishBookList list)
        {
            throw new System.NotImplementedException();
        }

        Task IWishListRepo.DeleteList(string username)
        {
            throw new System.NotImplementedException();
        }
    }
}
