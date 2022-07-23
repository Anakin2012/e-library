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
        private readonly IWishListRepository _repository;

        public WishListService(CatalogGrpcService grpcService, IWishListRepository repository)
        {
            _grpcService = grpcService;
            _repository = repository;
        }

        public async Task<List<ListItem>> getRecommendationsByAuthor(string username){

            Dictionary<string, int> writerCounterMap = new Dictionary<string, int>();

            List<ListItem> result = new List<ListItem>();
            WishBookList usersBooks = await _repository.GetList(username);

            foreach (ListItem bookItem in usersBooks.WishedBooks) {
                if (!writerCounterMap.ContainsKey(bookItem.Writer))
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

            var allBooks = await _grpcService.GetBooksByAuthor(recommendedWriter);

            foreach (var book in allBooks.Books) {
                ListItem item = new ListItem();
                item.BookId = book.Id;
                item.BookTitle = book.Title;
                item.Writer = book.Author;
                result.Add(item);
            }

            return result;
        }

        public async Task<List<ListItem>> getRecommendationsByGenre(string username)
        {
            Dictionary<string, int> writerCounterMap = new Dictionary<string, int>();

            List<ListItem> result = new List<ListItem>();
            WishBookList usersBooks = await _repository.GetList(username);

            //TODO umesto Writer treba dodati Genre
            foreach (ListItem bookItem in usersBooks.WishedBooks)
            {
                if (!writerCounterMap.ContainsKey(bookItem.Writer))
                {
                    writerCounterMap.Add(bookItem.Writer, 1);
                }
                else
                {
                    int currCounter = writerCounterMap[bookItem.Writer];
                    currCounter += 1;
                    writerCounterMap[bookItem.Writer] = currCounter;
                }
            }

            string recommendedWriter = "";
            int max = writerCounterMap.Values.Max();
            foreach (string writer in writerCounterMap.Keys)
            {
                if (writerCounterMap[writer] == max)
                    recommendedWriter = writer;
            }

            var allBooks = await _grpcService.GetBooksByAuthor(recommendedWriter);

            foreach (var book in allBooks.Books)
            {
                ListItem item = new ListItem();
                item.BookId = book.Id;
                item.BookTitle = book.Title;
                item.Writer = book.Author;
                result.Add(item);
            }

            return result;
        }
    }
}
