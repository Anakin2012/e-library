using Catalog.API.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.API.Data
{
    public class CatalogContext : ICatalogContext
    {
        // konstruktor za povezivanje na bazu podataka
        // i za inicijalizaciju kolekcije u toj bazi
        public CatalogContext()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("CatalogDB");

            Books = database.GetCollection<Book>("Books");
            CatalogContextSeed.SeedData(Books);
        }
        public IMongoCollection<Book> Books { get; }
    }
}
