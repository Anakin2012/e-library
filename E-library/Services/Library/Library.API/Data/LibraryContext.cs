using Library.API.Enitites;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Data
{
    public class LibraryContext : ILibraryContext
    {

        public LibraryContext(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
            var database = client.GetDatabase("LibraryDB");

            LibraryItems = database.GetCollection<LibraryItem>("LibraryItems");
        }

        public IMongoCollection<LibraryItem> LibraryItems { get; }
    }
}
