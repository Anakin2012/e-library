using MediatR;
using Ordering.Application.Cqrs.Orders.Queries.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Application.Cqrs.Orders.Queries.GetOrders
{
    public class GetAllOrdersQuery : IRequest<List<OrderDTO>>
    {

        public GetAllOrdersQuery()
        {
        }
    }
}
