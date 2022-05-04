using Catalog.API.Data;
using Catalog.API.Entities;
using Catalog.API.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Catalog.API.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly ICatalogContext _context;

        public BookRepository(ICatalogContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            return await _context.Books.Find(b => true).ToListAsync(); // asinhrono pretvara kolekciju u listu
        }
        public async Task<Book> GetBook(string id)
        {
            return await _context.Books.Find(b => b.Id == id).FirstOrDefaultAsync(); // vraca prvi ili podrazumevanu vrednost
        }

        public async Task<IEnumerable<Book>> GetBooksByGenre(string genre)
        {
            return await _context.Books.Find(b => b.Genre == genre).ToListAsync();
        }

        public async Task CreateBook(Book book)
        {
            await _context.Books.InsertOneAsync(book);
        }

        public async Task<bool> UpdateBook(Book book)
        {
            var updateResult = await _context.Books.ReplaceOneAsync(b => b.Id == book.Id, book);
            return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
        }
        public async Task<bool> DeleteBook(string id)
        {
            var deleteResult = await _context.Books.DeleteOneAsync(b => b.Id == id);
            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }
    }

    
}
