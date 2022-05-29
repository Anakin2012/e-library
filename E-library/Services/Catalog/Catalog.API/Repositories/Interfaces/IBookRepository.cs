using Catalog.API.DTOs;
using Catalog.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.API.Repositories.Interfaces
{
    public interface IBookRepository
    {
        Task<IEnumerable<BookDTO>> GetBooks();
        Task<BookDTO> GetBook(string id);
        Task<IEnumerable<BookDTO>> GetBooksByGenre(string genre);
        Task CreateBook(CreateBookDTO bookDTO);
        Task<bool> UpdateBook(UpdateBookDTO bookDTO);
        Task<bool> DeleteBook(string id);
    }
}
