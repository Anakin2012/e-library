using AutoMapper;
using EventBus.Messages.Events;
using MailService.Models;
using MailService.SendingMailsService;
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
        private readonly ISendingMails sendMail;

        public MembershipExpiringConsumer(IMediator mediator, IMapper mapper, ISendingMails sendMail)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.sendMail = sendMail ?? throw new ArgumentNullException(nameof(sendMail));
        }

        public async Task Consume(ConsumeContext<MembershipExpiringEvent> context)
        {
            var membershipExpiringModel = _mapper.Map<MembershipExpiringModel>(context.Message);
            await sendMail.SendMembershipExparingMail(membershipExpiringModel); // iskoristiti mediator ovde
        }
    }
}
