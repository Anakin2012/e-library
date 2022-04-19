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
                    Id = "602d2149e773f2a3990b47fa",
                    Title = "Nineteen Eighty-Four",
                    Author = "George Orwell",
                    Genre = "Fiction",
                    Language = "English",
                    Description = "The book is set in 1984 in Oceania, one of three perpetually warring totalitarian states (the other two are Eurasia and Eastasia). Oceania is governed by the all-controlling Party, which has brainwashed the population into unthinking obedience to its leader, Big Brother. The Party has created a propagandistic language known as Newspeak, which is designed to limit free thought and promote the Party’s doctrines. Its words include doublethink (belief in contradictory ideas simultaneously), which is reflected in the Party’s slogans: “War is peace,” “Freedom is slavery,” and “Ignorance is strength.” The Party maintains control through the Thought Police and continual surveillance.",
                    CoverImageFile = "1984Cover.png",
                    IsAvailable = true
                },
                new Book()
                {
                    Id = "602d2149e773f2a3990b47f8",
                    Title = "Algorithms to Live By: The Computer Science of Human Decisions",
                    Author = "Brian Christian",
                    Genre = "Computer Science",
                    Language = "English",
                    Description = "An exploration of how computer algorithms can be applied to our everyday lives to solve common decision-making problems and illuminate the workings of the human mind.",
                    CoverImageFile = "Algorithms.png",
                    IsAvailable = true
                },
                new Book()
                {
                    Id = "602d2149e773f2a3990b47f9",
                    Title = "Crime And Punishment",
                    Author = "Fyodor Dostoyevsky",
                    Genre = "Psychological fiction",
                    Language = "Russian",
                    Description = "Raskolnikov, a destitute and desperate former student, wanders through the slums of St Petersburg and commits a random murder without remorse or regret. He imagines himself to be a great man, a Napoleon: acting for a higher purpose beyond conventional moral law. But as he embarks on a dangerous game of cat and mouse with a suspicious police investigator, Raskolnikov is pursued by the growing voice of his conscience and finds the noose of his own guilt tightening around his neck. Only Sonya, a downtrodden sex worker, can offer the chance of redemption",
                    CoverImageFile = "Crime&PunishmentCover.png",
                    IsAvailable = true
                }
            };
        }
    }
}
