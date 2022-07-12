using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.API.Entities;

namespace WishList.API.Services
{
    public interface IWishListService
    {

        public Task<List<ListItem>> getRecommendations(string username);

    }
}
