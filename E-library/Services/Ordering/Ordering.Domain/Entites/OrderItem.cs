using Ordering.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Domain.Entites
{
    public class OrderItem :EntityBase
    {

        public string BookId { get; private set; }

        public string BookTitle { get; private set; }

        public string Author { get; private set; }

        public string Genre { get; private set; }

        public OrderItem(string bookId, string bookTitle, string author, string genre)
        {
            BookId = bookId;
            BookTitle = bookTitle;
            Author = author;
            Genre = genre;
        }
        
    }
}
