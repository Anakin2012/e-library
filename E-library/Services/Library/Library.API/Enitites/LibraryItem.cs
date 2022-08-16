using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Enitites
{
    public class LibraryItem
    {
        public string Username { get; set; }
        public string BookId { get; set; }
        public string Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public string CoverImageFile { get; set; } // putanja do slike 
        public bool IsPremium { get; set; } // ako je true, dostupna samo premium clanovima 


    }
}
