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
    public class DeletingAccountConsumer : IConsumer<DeletingAccountEvent>
    {

        private readonly IMapper _mapper;
        private readonly ISendingMails sendMail;

        public DeletingAccountConsumer(IMapper mapper, ISendingMails sendMail)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.sendMail = sendMail ?? throw new ArgumentNullException(nameof(sendMail));
        }

        public async Task Consume(ConsumeContext<DeletingAccountEvent> context)
        {
            var deletingModel = _mapper.Map<DeletingAccountModel>(context.Message);
            await sendMail.SendDeletingAccountMail(deletingModel);
        }
    }
}
