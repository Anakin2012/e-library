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

        public async Task<List<ListItem>> addBookToWishList(string username, string bookId)
        {
            var book = await _grpcService.GetBookById(bookId);

            WishBookList wishList;
            if (await _repository.GetList(username) != null)
            {
                wishList = await _repository.GetList(username);
            }
            else
            {
                wishList = new WishBookList(username);
            }



            ListItem item = new ListItem();
            item.BookId = book.Book.Id;
            item.BookTitle = book.Book.Title;
            item.Author = book.Book.Author;
            item.Genre = book.Book.Genre;
            item.IsAvailable = book.Book.IsAvailable;
            item.IsPremium = book.Book.IsPremium;
            item.CoverImageFile = book.Book.CoverImageFile;
            wishList.WishedBooks.Add(item);

            await _repository.UpdateList(wishList);

            return wishList.WishedBooks;


        }

        public async Task<List<ListItem>> getRecommendationsByAuthor(string username){

            Dictionary<string, int> writerCounterMap = new Dictionary<string, int>();

            List<ListItem> result = new List<ListItem>();
            WishBookList usersBooks = await _repository.GetList(username);

            foreach (ListItem bookItem in usersBooks.WishedBooks) {
                if (!writerCounterMap.ContainsKey(bookItem.Author))
                {
                    writerCounterMap.Add(bookItem.Author, 1);
                }
                else {
                    int currCounter = writerCounterMap[bookItem.Author];
                    currCounter += 1;
                    writerCounterMap[bookItem.Author] = currCounter;
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
                item.Author = book.Author;
                result.Add(item);
            }

            return result;
        }

        public async Task<List<ListItem>> getRecommendationsByGenre(string username)
        {
            Dictionary<string, int> genreCounterMap = new Dictionary<string, int>();

            List<ListItem> result = new List<ListItem>();
            WishBookList usersBooks = await _repository.GetList(username);

            //TODO umesto Writer treba dodati Genre
            foreach (ListItem bookItem in usersBooks.WishedBooks)
            {
                if (!genreCounterMap.ContainsKey(bookItem.Genre))
                {
                    genreCounterMap.Add(bookItem.Genre, 1);
                }
                else
                {
                    int currCounter = genreCounterMap[bookItem.Genre];
                    currCounter += 1;
                    genreCounterMap[bookItem.Genre] = currCounter;
                }
            }

            string recommendedGenre = "";
            int max = genreCounterMap.Values.Max();
            foreach (string genre in genreCounterMap.Keys)
            {
                if (genreCounterMap[genre] == max)
                    recommendedGenre = genre;
            }

            var allBooks = await _grpcService.GetBooksByGenre(recommendedGenre);

            foreach (var book in allBooks.Books)
            {
                ListItem item = new ListItem();
                item.BookId = book.Id;
                item.BookTitle = book.Title;
                item.Author = book.Author;
                item.Genre = book.Genre;
                result.Add(item);
            }

            return result;
        }
    }
}
