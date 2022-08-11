using MailService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.SendingMailsService
{
    public class SendingMails : ISendingMails
    {
        public async Task<bool> SendMembershipExparingMail(MembershipExpiringModel membershipExpiringModel) {
            return true;  // implementirati kasnije
        }
    }
}
