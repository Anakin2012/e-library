using Catalog.API.Entities;
using Microsoft.Extensions.Configuration;
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
        public CatalogContext(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
            var database = client.GetDatabase("CatalogDB");

            Books = database.GetCollection<Book>("Books");
           // CatalogContextSeed.SeedData(Books);
        }
        public IMongoCollection<Book> Books { get; }
    }
}
