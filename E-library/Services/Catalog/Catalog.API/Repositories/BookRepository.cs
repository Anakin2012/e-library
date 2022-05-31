using Catalog.API.Data;
using Catalog.API.Entities;
using Catalog.API.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using Catalog.API.DTOs;
using AutoMapper;

namespace Catalog.API.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly ICatalogContext _context;
        private readonly IMapper _mapper;

        public BookRepository(ICatalogContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<BookDTO>> GetBooks()
        {
            var books = await _context.Books.Find(b => true).ToListAsync(); // asinhrono pretvara kolekciju u listu
            return _mapper.Map<IEnumerable<BookDTO>>(books);
        }
        public async Task<BookDTO> GetBook(string id)
        {
            var book = await _context.Books.Find(b => b.Id == id).FirstOrDefaultAsync(); // vraca prvi ili podrazumevanu vrednost
            return _mapper.Map<BookDTO>(book);
        }

        public async Task<IEnumerable<BookDTO>> GetBooksByGenre(string genre)
        {
            var books = await _context.Books.Find(b => b.Genre == genre).ToListAsync();
            return _mapper.Map<IEnumerable<BookDTO>>(books);
        }

        // todo: mozda treba fix
        public async Task CreateBook(CreateBookDTO bookDTO)
        {
            var book = _mapper.Map<Book>(bookDTO);
            await _context.Books.InsertOneAsync(book);
        }

        public async Task<bool> UpdateBook(UpdateBookDTO bookDTO)
        {
            var book = _mapper.Map<Book>(bookDTO);
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
