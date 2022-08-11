using MailService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.SendingMailsService
{
    public interface ISendingMails
    {
        public Task<bool> SendMembershipExparingMail(MembershipExpiringModel membershipExpiringModel);

    }
}
