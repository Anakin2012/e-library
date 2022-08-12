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
    public class ChangePasswordConsumer : IConsumer<ChangePasswordEvent>
    {

        private readonly IMapper _mapper;
        private readonly ISendingMails sendMail;

        public ChangePasswordConsumer(IMapper mapper, ISendingMails sendMail)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.sendMail = sendMail ?? throw new ArgumentNullException(nameof(sendMail));
        }

        public async Task Consume(ConsumeContext<ChangePasswordEvent> context)
        {
            var changePasswordModel = _mapper.Map<ChangePasswordModel>(context.Message);
            await sendMail.SendChangePasswordMail(changePasswordModel);
        }
    }
}
