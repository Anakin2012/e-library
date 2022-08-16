using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.DTOs
{
    public class BaseLibraryItemDTO
    {
        public string Username { get; set; }
        public string BookId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public string CoverImageFile { get; set; }
        public bool IsPremium { get; set; }
    }
}
