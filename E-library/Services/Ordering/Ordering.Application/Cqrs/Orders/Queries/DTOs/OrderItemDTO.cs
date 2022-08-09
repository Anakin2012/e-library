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
        
    }

}
