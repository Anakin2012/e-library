using Library.API.DTOs;
using Library.API.Enitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Repositories
{
    public interface ILibraryRepository
    {

        public Task<IEnumerable<LibraryItemDTO>> GetAllBooksForUser(string username);

        public Task AddLibraryItem(LibraryItemDTO book);

        public Task<bool> DeleteLibraryItems(string username);

        public Task DeleteLibraryItem(string libraryItemId, string username);

    }
}
