using Library.API.Enitites;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Data
{
    public interface ILibraryContext
    {

        public IMongoCollection<LibraryItem> LibraryItems { get; }

    }
}
