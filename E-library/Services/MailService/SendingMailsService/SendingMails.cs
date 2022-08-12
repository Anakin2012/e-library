using MailKit.Net.Smtp;
using MailService.Models;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.SendingMailsService
{
    public class SendingMails : ISendingMails
    {
        private readonly MailSettings _mailSettings;

        public SendingMails(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value ?? throw new ArgumentNullException(nameof(mailSettings));
        }

        public async  Task<bool> SendPayingMembershipMail(PayingModel payingModel) {
            var email = new MimeMessage();

            email.Sender = MailboxAddress.Parse(_mailSettings.EmailAddress);
            email.To.Add(MailboxAddress.Parse(payingModel.To));
            email.Subject = "E-Library Membership payed!";

            var builder = new BodyBuilder();

            builder.HtmlBody = "Hello " + payingModel.Name + " " + payingModel.Surname + "!\n Your E-Library membership for this mounth has just been payed.";
            builder.TextBody = "Hello " + payingModel.Name + " " + payingModel.Surname + "!\n Your E-Library membership for this mounth has just been payed.";

            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();

            smtp.Connect(_mailSettings.Host, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.EmailAddress, _mailSettings.Password);

            try
            {
                await smtp.SendAsync(email);

            }
            catch (Exception e)
            {
                return false;
            }
            finally
            {
                smtp.Disconnect(true);
            }

            return true;
        }

        public async Task<bool> SendDeletingAccountMail(DeletingAccountModel deletingAccountModel) {
            var email = new MimeMessage();

            email.Sender = MailboxAddress.Parse(_mailSettings.EmailAddress);
            email.To.Add(MailboxAddress.Parse(deletingAccountModel.To));
            email.Subject = "Your E-Library account has been deactivated!";

            var builder = new BodyBuilder();

            builder.HtmlBody = "Hello " + deletingAccountModel.Name + " " + deletingAccountModel.Surname + "!\n Your E-Library account has been deleted.";
            builder.TextBody = "Hello " + deletingAccountModel.Name + " " + deletingAccountModel.Surname + "!\n Your E-Library account has been deleted.";

            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();

            smtp.Connect(_mailSettings.Host, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.EmailAddress, _mailSettings.Password);

            try
            {
                await smtp.SendAsync(email);

            }
            catch (Exception e)
            {
                return false;
            }
            finally
            {
                smtp.Disconnect(true);
            }

            return true;
        }

        public async Task<bool> SendChangePasswordMail(ChangePasswordModel changePasswordModel) {
            var email = new MimeMessage();

            email.Sender = MailboxAddress.Parse(_mailSettings.EmailAddress);
            email.To.Add(MailboxAddress.Parse(changePasswordModel.To));
            email.Subject = "E-Library password changed!";

            var builder = new BodyBuilder();

            builder.HtmlBody = "Hello " + changePasswordModel.Name + " " + changePasswordModel.Surname + "!\n Your E-Library password has been changed from " + changePasswordModel.OldPassword + " to " + changePasswordModel.NewPassword + "\n";
            builder.TextBody = "Hello " + changePasswordModel.Name + " " + changePasswordModel.Surname + "!\n Your E-Library password has been changed from " + changePasswordModel.OldPassword + " to " + changePasswordModel.NewPassword + "\n";

            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();

            smtp.Connect(_mailSettings.Host, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.EmailAddress, _mailSettings.Password);

            try
            {
                await smtp.SendAsync(email);

            }
            catch (Exception e)
            {
                return false;
            }
            finally
            {
                smtp.Disconnect(true);
            }

            return true;
        }


        public async Task<bool> SendMembershipExpiringMail(MembershipExpiringModel membershipExpiringModel) {

            var email = new MimeMessage();

            email.Sender = MailboxAddress.Parse(_mailSettings.EmailAddress);
            email.To.Add(MailboxAddress.Parse(membershipExpiringModel.To));
            email.Subject = "E-Library membership expires in 3 days!";

            var builder = new BodyBuilder();

            builder.HtmlBody = "Hello " + membershipExpiringModel.Name + " " + membershipExpiringModel.Surname + "!\n Your E-Library membership is expiring in 3 days. Please, be sure to renew your membership!\n";
            builder.TextBody = "Hello " + membershipExpiringModel.Name + " " + membershipExpiringModel.Surname + "!\n Your E-Library membership is expiring in 3 days. Please, be sure to renew your membership!\n";

            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();

            smtp.Connect(_mailSettings.Host, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.EmailAddress, _mailSettings.Password);

            try
            {
                await smtp.SendAsync(email);

            }
            catch (Exception e)
            {
                return false;
            }
            finally {
                smtp.Disconnect(true);
            }

            return true;

        }

    }
}
