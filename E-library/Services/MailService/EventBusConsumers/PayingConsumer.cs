using AutoMapper;
using EventBus.Messages.Events;
using MailService.Models;
using MailService.SendingMailsService;
using MassTransit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.EventBusConsumers
{
    public class PayingConsumer : IConsumer<PayingEvent>
    {

        private readonly IMapper _mapper;
        private readonly ISendingMails sendMail;

        public PayingConsumer(IMapper mapper, ISendingMails sendMail)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.sendMail = sendMail ?? throw new ArgumentNullException(nameof(sendMail));
        }


        public async Task Consume(ConsumeContext<PayingEvent> context)
        {
            var payingModel = _mapper.Map<PayingModel>(context.Message);
            await sendMail.SendPayingMembershipMail(payingModel);
        }
    }
}
