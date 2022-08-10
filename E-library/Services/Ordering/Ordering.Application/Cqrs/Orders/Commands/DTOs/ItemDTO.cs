using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Application.Cqrs.Orders.Commands.DTOs
{
    public class ItemDTO
    {
        public string BookTitle { get; set; }
        public string BookId { get; set; }
        public string Genre { get; set; }
        public string Author { get; set; }
    }
}
