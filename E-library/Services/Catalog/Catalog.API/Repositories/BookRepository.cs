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
    }

    
}
