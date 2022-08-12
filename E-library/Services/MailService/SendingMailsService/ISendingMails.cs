using MailService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.SendingMailsService
{
    public interface ISendingMails
    {
        public Task<bool> SendMembershipExpiringMail(MembershipExpiringModel membershipExpiringModel);
        public Task<bool> SendPayingMembershipMail(PayingModel payingModel);
        public Task<bool> SendDeletingAccountMail(DeletingAccountModel deletingAccountModel);
        public Task<bool> SendChangePasswordMail(ChangePasswordModel changePasswordModel);
    }
}
