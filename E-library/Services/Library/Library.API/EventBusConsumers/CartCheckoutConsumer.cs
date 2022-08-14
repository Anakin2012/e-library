using AutoMapper;
using EventBus.Messages.Events;
using Library.API.DTOs;
using Library.API.Enitites;
using Library.API.Repositories;
using MassTransit;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.EventBusConsumers
{
    public class CartCheckoutConsumer : IConsumer<CartCheckoutEvent>
    {
        private readonly ILibraryRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<CartCheckoutConsumer> _logger;

        public CartCheckoutConsumer(ILibraryRepository repository, IMapper mapper, ILogger<CartCheckoutConsumer> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task Consume(ConsumeContext<CartCheckoutEvent> context)
        {

            string username = context.Message.Username;
            foreach (CartItem item in context.Message.OrderItems)
            {
                LibraryItem libItem = new LibraryItem();
                libItem.Id = item.BookId + username;
                libItem.Title = item.BookTitle;
                libItem.Username = username;
                await _repository.AddLibraryItem(_mapper.Map<LibraryItemDTO>(libItem));
                _logger.LogInformation($"{typeof(CartCheckoutEvent).Name} consumed successfully. Added book to library. User : {username}, BookID: {item.BookId}");
            }


        }
    }
}
