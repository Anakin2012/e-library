using System.Threading.Tasks;
using WishList.API.Entities;

namespace WishList.API.Repositories
{
    public interface IWishListRepository
    {
        Task<WishBookList> GetList(string username);

        Task<WishBookList> UpdateList(WishBookList list);

        Task DeleteList(string username);

    
    }
}
