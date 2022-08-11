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
        private readonly IMapper _mapper;
        private readonly ISendingMails sendMail;

        public MembershipExpiringConsumer(IMapper mapper, ISendingMails sendMail)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.sendMail = sendMail ?? throw new ArgumentNullException(nameof(sendMail));
        }

        public async Task Consume(ConsumeContext<MembershipExpiringEvent> context)
        {
            var membershipExpiringModel = _mapper.Map<MembershipExpiringModel>(context.Message);
            await sendMail.SendMembershipExpiringMail(membershipExpiringModel);
        }
    }
}
