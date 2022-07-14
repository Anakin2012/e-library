﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.API.DTOs
{
    public class BaseBookDTO
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public string CoverImageFile { get; set; } // putanja do slike
        public bool IsAvailable { get; set; } // da li je knjiga dostupna za iznajmljivanje 
        public bool IsPremium { get; set; }
        public int RentCount { get; set; }
    }
}
