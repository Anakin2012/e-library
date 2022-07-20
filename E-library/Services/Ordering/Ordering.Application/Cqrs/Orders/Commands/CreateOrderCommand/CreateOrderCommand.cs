using MediatR;
using Ordering.Application.Cqrs.Orders.Commands.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Application.Cqrs.Orders.Commands.CreateOrderCommand
{
    public class CreateOrderCommand : IRequest<int>
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string EmailAddress { get; set; }


        public string CustomerId { get; set; }
        public string Username { get; set; }
        public IEnumerable<OrderItemDTO> OrderItems { get; set; }

    }
}
