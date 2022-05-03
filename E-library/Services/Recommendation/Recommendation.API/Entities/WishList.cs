using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recommendation.API.Entities
{
    public class WishList
    {

        public string Id { get; set; }

        public string UserId { get; set; }

        public List<Book> Wishlist { get; set; } = new List<Book>();

    }
}

