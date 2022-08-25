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
                new Book()
                {
                    Id = "62d01c23640257a83769635b",
                    Title = "Successful Time Management For Dummies",
                    Author = "Dirk Zeller",
                    Genre = "Business, Economics",
                    Language = "English",
                    Description = "A MUST READ for anyone who has ever felt the pain of too little time in their business or personal life.",
                    CoverImageFile = "/assets/book_covers/coverdummy.png",
                    IsAvailable = true,
                    IsPremium = false,
                    RentCount = 0
                },
                new Book()
                {
                    Id = "62d01eaae3714cba602e7fb5",
                    Title = "Red Queen",
                    Author = "Victoria Aveyard",
                    Genre = "Science Fiction, Fantasy",
                    Language = "English",
                    Description = "Graceling meets The Selection in debut novelist Victoria Aveyard's sweeping tale of seventeen-year-old Mare, a common girl whose once-latent magical power draws her into the dangerous intrigue of the king's palace. Will her power save her or condemn her?",
                    CoverImageFile = "/assets/book_covers/redqueen.png",
                    IsAvailable = true,
                    IsPremium = false,
                    RentCount = 0
                },
                new Book()
                {
                    Id = "62f927a7f6651301f7306049",
                    Title = "Harry Potter And The Prisoner Of Azkaban",
                    Author = "J.K.Rowling",
                    Genre = "Children, Fiction, Fantasy",
                    Language = "English",
                    Description = "For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black. Convicted of killing thirteen people with a single curse, he was said to be the heir apparent to the Dark Lord, Voldemort.",
                    CoverImageFile = "/assets/book_covers/hp3.png",
                    IsAvailable = true,
                    IsPremium = false,
                    RentCount = 4
                },
                new Book()
                {
                    Id = "62f92ee9f6651301f730604b",
                    Title = "Fairy Tale",
                    Author = "Stephen King",
                    Genre = "Horror, Fiction",
                    Language = "English",
                    Description = "Legendary storyteller Stephen King goes into the deepest well of his imagination in this spellbinding novel about a seventeen-year-old boy who inherits the keys to a parallel world where good and evil are at war, and the stakes could not be higher—for that world or ours.",
                    CoverImageFile = "/assets/book_covers/fairy.png",
                    IsAvailable = true,
                    IsPremium = false,
                    RentCount = 0
                },
                new Book()
                {
                    Id = "62fb7859c3083cf1df54abcf",
                    Title = "Florette",
                    Author = "Anna Walker",
                    Genre = "Children",
                    Language = "English",
                    Description = "When Mae’s family moves to a new home, she wishes she could bring her garden with her. She’ll miss the apple trees, the daffodils, and chasing butterflies in the wavy grass.  But there’s no room for a garden in the city. Or is there?",
                    CoverImageFile = "/assets/book_covers/florette.png",
                    IsAvailable = true,
                    IsPremium = true,
                    RentCount = 3
                },
                new Book()
                {
                    Id = "6300fc8b2c079eb927f25197",
                    Title = "A Brief History of Time",
                    Author = "Stephen Hawking",
                    Genre = "Science",
                    Language = "English",
                    Description = "A landmark volume in science writing by one of the great minds of our time, Stephen Hawking’s book explores such profound questions as: How did the universe begin—and what made its start possible? Does time always flow forward?",
                    CoverImageFile = "/assets/book_covers/BriefHist.png",
                    IsAvailable = true,
                    IsPremium = true,
                    RentCount = 5
                },
                new Book()
                {
                    Id = "62fe2d43cc5a91e933df0683",
                    Title = "Harry Potter And The Sorcerer's Stone - Illustrated Edition",
                    Author = "J.K.Rowling",
                    Genre = "Children, Fantasy",
                    Language = "English",
                    Description = "he beloved first book of the Harry Potter series, now fully illustrated by award-winning artist Jim Kay.",
                    CoverImageFile = "/assets/book_covers/hp1.png",
                    IsAvailable = false,
                    IsPremium = true,
                    RentCount = 0
                }
            };
        }
    }
}

