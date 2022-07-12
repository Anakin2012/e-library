using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.API.Entities;
using WishList.API.GrpcServices;
using WishList.API.Repositories;

namespace WishList.API.Services
{
    public class WishListService:IWishListService
    {

        private readonly CatalogGrpcService _grpcService;
        private readonly WishListRepository _repository;

        public async Task<List<ListItem>> getRecommendations(string username){
            var allBooks = await _grpcService.GetBooks();

            Dictionary<string, int> writerCounterMap = new Dictionary<string, int>();

            List<ListItem> result = new List<ListItem>();
            //TODO dodati logiku iza ove metode , kad se zavrsi repozitorijum za wishlist, proveravam najcesci zanr, i nudim iz te informacije, relevantne knjige
            WishBookList usersBooks = await _repository.GetList(username);

            foreach (ListItem bookItem in usersBooks.WishedBooks) {
                if (writerCounterMap.ContainsKey(bookItem.Writer))
                {
                    writerCounterMap.Add(bookItem.Writer, 1);
                }
                else {
                    int currCounter = writerCounterMap[bookItem.Writer];
                    currCounter += 1;
                    writerCounterMap[bookItem.Writer] = currCounter;
                }
            }

            string recommendedWriter = "";
            int max = writerCounterMap.Values.Max();
            foreach (string writer in writerCounterMap.Keys) {
                if (writerCounterMap[writer] == max)
                    recommendedWriter = writer;
            }

            foreach (var book in allBooks.Books) {
                if (book.Author.Equals(recommendedWriter)){
                    ListItem item = new ListItem();
                    item.BookId = book.Id;
                    item.BookTitle = book.Title;
                    item.Writer = book.Author;
                    result.Add(item);
                }
            }

            return result;
        }
    }
}
