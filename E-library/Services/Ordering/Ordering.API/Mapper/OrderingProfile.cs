using AutoMapper;
using Ordering.Application.Cqrs.Orders.Commands.CreateOrderCommand;
using Ordering.Application.Cqrs.Orders.Commands.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ordering.API.Mapper
{
    public class OrderingProfile : Profile
    {
        public OrderingProfile()
        {
            CreateMap<CreateOrderCommand, EventBus.Messages.Events.CartCheckoutEvent>().ReverseMap();
            CreateMap<ItemDTO, EventBus.Messages.Events.CartItem>().ReverseMap();
        }
    }
}
