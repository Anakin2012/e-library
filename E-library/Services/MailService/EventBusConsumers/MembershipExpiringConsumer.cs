using AutoMapper;
using EventBus.Messages.Events;
using MassTransit;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.EventBusConsumers
{
    public class MembershipExpiringConsumer : IConsumer<MembershipExpiringEvent>
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public MembershipExpiringConsumer(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public Task Consume(ConsumeContext<MembershipExpiringEvent> context)
        {
            throw new NotImplementedException();
        }
    }
}
