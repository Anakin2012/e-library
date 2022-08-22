using AutoMapper;
using Library.API.Data;
using Library.API.DTOs;
using Library.API.Enitites;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Repositories
{
    public class LibraryRepository : ILibraryRepository
    {

        private readonly ILibraryContext _context;
        private readonly IMapper _mapper;

        public LibraryRepository(ILibraryContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<LibraryItemDTO>> GetAllBooksForUser(string username)
        {
            var userBooks = await _context.LibraryItems.Find(b => b.Username == username).ToListAsync();
            return _mapper.Map<IEnumerable<LibraryItemDTO>>(userBooks);
        }

        public async Task<LibraryItemDTO> GetLibraryItem(string id) {
            var item = await _context.LibraryItems.Find(b => b.Id == id).FirstOrDefaultAsync();
            return _mapper.Map<LibraryItemDTO>(item);
        }

        public async Task AddLibraryItem(LibraryItemDTO libraryItemDTO)
        {
            var libraryItem = new LibraryItem();
            libraryItem.Id = libraryItemDTO.Id;
            libraryItem.BookId = libraryItemDTO.BookId;
            libraryItem.Username = libraryItemDTO.Username;
            libraryItem.Title = libraryItemDTO.Title;
            libraryItem.Genre = libraryItemDTO.Genre;
            libraryItem.Author = libraryItemDTO.Author;
            libraryItem.Language = libraryItemDTO.Language;
            libraryItem.IsPremium = libraryItemDTO.IsPremium;
            libraryItem.CoverImageFile = libraryItemDTO.CoverImageFile;
            libraryItem.Description = libraryItemDTO.Description;

            await _context.LibraryItems.InsertOneAsync(libraryItem);
        }

        public async  Task DeleteLibraryItem(string libraryItemId)
        {
            await _context.LibraryItems.DeleteOneAsync(b => b.Id == libraryItemId);
        }

        public async Task<bool> DeleteLibraryItems(string username)
        {

            var deleteResult = await _context.LibraryItems.DeleteManyAsync(b => b.Username == username);

            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }

    }
}
