using ShoppingCart.API.Entities;
using System.Threading.Tasks;

namespace ShoppingCart.API.Repositories
{
    public interface ICartRepo
    {
        Task<Cart> GetCart(string username);

        Task<Cart> UpdateCart(Cart cart);

        Task DeleteCart(string username);
    }
}
