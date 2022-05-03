using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recommendation.API.Entities
{
    public class Recommendation
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public List<Book> Recommendations { get; set; } = new List<Book>();
    }
}

