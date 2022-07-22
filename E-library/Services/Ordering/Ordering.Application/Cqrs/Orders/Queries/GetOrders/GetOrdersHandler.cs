using MediatR;
using Ordering.Application.Contracts.Factories;
using Ordering.Application.Contracts.Persistence;
using Ordering.Application.Cqrs.Orders.Queries.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Ordering.Application.Cqrs.Orders.Queries.GetOrders
{
    public class GetOrdersHandler : IRequestHandler<GetOrdersQuery, List<OrderDTO>>
    {

        private readonly IOrderRepository _repository;
        private readonly IOrderDTOFactory _factory;
        public async Task<List<OrderDTO>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {
            var orderList = await _repository.GetOrdersByUsername(request.Username);
            return orderList.Select(order => _factory.CreateOrderDTO(order)).ToList();
        }
    }
}
