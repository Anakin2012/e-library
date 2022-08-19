using AutoMapper;
using EventBus.Messages.Events;
using MassTransit;
using MediatR;
using Microsoft.Extensions.Logging;
using Ordering.Application.Cqrs.Orders.Commands.CreateOrderCommand;
using Ordering.Application.Cqrs.Orders.Commands.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ordering.API.EventBusConsumers
{
    public class CartCheckoutConsumer : IConsumer<CartCheckoutEvent>
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        private readonly ILogger<CartCheckoutConsumer> _logger;

        public CartCheckoutConsumer(IMediator mediator, IMapper mapper, ILogger<CartCheckoutConsumer> logger)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task Consume(ConsumeContext<CartCheckoutEvent> context)
        {

            CreateOrderCommand command = new CreateOrderCommand();
            command.State = "";
            command.Street = "";
            command.ZipCode = "";
            command.City = "";
            command.Country = "";
            command.EmailAddress = "";
            CartCheckoutEvent checkOutEvent = context.Message;
            command.OrderItems = _mapper.Map<IEnumerable<ItemDTO>>(checkOutEvent.Items);
            var id = await _mediator.Send(command);

            _logger.LogInformation($"{typeof(CartCheckoutEvent).Name} consumed successfully. Created order id: {id}");

        }
    }
}
