using Ordering.Application.Contracts.Factories;
using Ordering.Application.Cqrs.Orders.Queries.DTOs;
using Ordering.Domain.Aggregates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Infrastructure.Factories
{
    public class OrderDTOFactory : IOrderDTOFactory
    {
        public OrderDTO CreateOrderDTO(Order order)
        {
            var orderVM = new OrderDTO();
            orderVM.Id = order.Id;
            orderVM.Id = order.Id;
            orderVM.Username = order.Username;
            orderVM.Street = order.Address.Street;
            orderVM.City = order.Address.City;
            orderVM.State = order.Address.State;
            orderVM.Country = order.Address.Country;
            orderVM.ZipCode = order.Address.ZipCode;
            orderVM.EmailAddress = order.Address.EmailAddress;
            orderVM.OrderDate = order.OrderDate;

            var orderItems = new List<OrderItemDTO>();
            foreach (var item in order.OrderItems)
            {
                var orderItem = new OrderItemDTO();
                orderItem.Id = item.Id;
                orderItem.BookTitle = item.BookTitle;
                orderItem.BookId = item.BookId;
                orderItem.BookGenre = item.Genre;
                orderItem.BookAuthor = item.Author;
                orderItem.CoverImageFile = item.CoverImageFile;
                orderItems.Add(orderItem);
            }
            orderVM.OrderItems = orderItems;

            return orderVM;
        }

    }
}
