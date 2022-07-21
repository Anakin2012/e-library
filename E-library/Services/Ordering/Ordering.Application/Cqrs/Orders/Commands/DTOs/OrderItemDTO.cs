using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Application.Cqrs.Orders.Commands.DTOs
{
    public class OrderItemDTO
    {
        public string BookTitle { get; set; }
        public string BookId { get; set; }
    }
}
