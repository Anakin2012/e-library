﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.API.Entities
{
    public class Book
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }        
        public string Description { get; set; }
        public string ImageFile { get; set; } // putanja do slike
        
    }
}
