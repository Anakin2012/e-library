using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.API.GrpcServices;

namespace WishList.API.Services
{
    public class WishListService
    {

        private readonly CatalogGrpcService _grpcService;

        async Task<List<int>> getRecommendationsAsync(){
            var books = await _grpcService.GetBooks();

            List<int> result = new List<int>();
            foreach (var book in  books.Books) {
                result.Add(book.Id);
            }

            //TODO dodati logiku iza ove metode , kad se zavrsi repozitorijum za wishlist, proveravam najcesci zanr, i nudim iz te informacije, relevantne knjige

            return result;
        }
    }
}
