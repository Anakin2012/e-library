﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingCart.API.Entities
{
    public class CartItem
    {
        public string BookTitle { get; set; }
        public string BookId { get; set; }
        public string BookAuthor { get; set; }
        public string BookGenre { get; set; }
        public string Language { get; set; }
        public bool IsPremium { get; set; }
        public string CoverImageFile { get; set; }
    }
}