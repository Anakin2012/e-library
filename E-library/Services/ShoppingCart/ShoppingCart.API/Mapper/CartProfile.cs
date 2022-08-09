using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingCart.API.Mapper
{
    public class CartProfile : Profile
    {
        public CartProfile()
        {
            CreateMap<Entities.CartCheckout, EventBus.Messages.Events.CartCheckoutEvent>().ReverseMap();
            CreateMap<Entities.CartItem, EventBus.Messages.Events.CartItem>().ReverseMap();
        }
    }
}
