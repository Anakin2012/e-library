using Catalog.API.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.API.Data
{
    // za dodavanje podrazumevanih knjiga u kolekciju
    public class CatalogContextSeed
    {
        // popunjavanje kolekcije podacima, ali samo ako ne postoje
        public static void SeedData(IMongoCollection<Book> bookCollection)
        {
            var exists = bookCollection.Find(b => true).Any();
            if (!exists)
            {
                bookCollection.InsertManyAsync(GetPreconfiguredBooks());
            }
        }

        private static IEnumerable<Book> GetPreconfiguredBooks()
        {
            return new List<Book>()
            {
                new Book()
                {
                    Id = "602d2149e773f2a3990b47fb",
                    Title = "Nineteen Eighty-Four",
                    Author = "George Orwell",
                    Genre = "Fiction",
                    Language = "English",
                    Description = "The book is set in 1984 in Oceania, one of three perpetually warring totalitarian states (the other two are Eurasia and Eastasia). Oceania is governed by the all-controlling Party, which has brainwashed the population into unthinking obedience to its leader, Big Brother..",
                    CoverImageFile = "/assets/book_covers/1984Cover.png",
                    IsAvailable = true,
                    IsPremium = false,
                    RentCount = 0
                },
                new Book()
                {
                    Id = "602d2149e773f2a3990b47fc",
                    Title = "Algorithms to Live By: The Computer Science of Human Decisions",
                    Author = "Brian Christian",
                    Genre = "Computer Science",
                    Language = "English",
                    Description = "An exploration of how computer algorithms can be applied to our everyday lives to solve common decision-making problems and illuminate the workings of the human mind.",
                    CoverImageFile = "/assets/book_covers/Algorithms.png",
                    IsAvailable = true,
                    IsPremium = true,
                    RentCount = 0
                },
                new Book()
                {
                    Id = "602d2149e773f2a3990b47f4",
                    Title = "Crime And Punishment",
                    Author = "Fyodor Dostoyevsky",
                    Genre = "Psychological fiction",
                    Language = "Russian",
                    Description = "Crime and Punishment follows the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who plans to kill an unscrupulous pawnbroker, an old woman who stores money and valuable objects in her flat.",
                    CoverImageFile = "/assets/book_covers/Crime&PunishmentCover.png",
                    IsAvailable = true,
                    IsPremium = false,
                    RentCount = 0
                },

              
            };
        }
    }
}
