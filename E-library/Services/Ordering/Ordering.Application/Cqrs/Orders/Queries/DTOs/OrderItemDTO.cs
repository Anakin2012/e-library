using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Application.Cqrs.Orders.Queries.DTOs
{
    public class OrderItemDTO
    {
        public int Id { get; set; }

        // Relevant information from OrderItem
        public string BookTitle { get; set; }
        public string BookId { get; set; }
        public string BookAuthor { get; set; }
        public string BookGenre { get; set; }
        public string Language { get; set; }
        public bool IsPremium { get; set; }
        public string CoverImageFile { get; set; }

    }

}
