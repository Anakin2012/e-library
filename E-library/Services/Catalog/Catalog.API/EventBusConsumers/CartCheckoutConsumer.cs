using AutoMapper;
using Catalog.API.DTOs;
using Catalog.API.Entities;
using Catalog.API.Repositories.Interfaces;
using EventBus.Messages.Events;
using MassTransit;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.API.EventBusConsumers
{
    public class CartCheckoutConsumer : IConsumer<CartCheckoutEvent>
    {
        private readonly IBookRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<CartCheckoutConsumer> _logger;

        public CartCheckoutConsumer(IBookRepository repository, IMapper mapper, ILogger<CartCheckoutConsumer> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task Consume(ConsumeContext<CartCheckoutEvent> context)
        {

            foreach (CartItem item in context.Message.OrderItems)
            {
                BookDTO bookDTO  = await _repository.GetBook(item.BookId);
                bookDTO.RentCount += 1;
                Book bookEntity = _mapper.Map<Book>(bookDTO);
                await _repository.UpdateBook(item.BookId, _mapper.Map<UpdateBookDTO>(bookEntity));
                _logger.LogInformation($"{typeof(CartCheckoutEvent).Name} consumed successfully. BookID: {item.BookTitle} updated");
            }


        }
    }
}
