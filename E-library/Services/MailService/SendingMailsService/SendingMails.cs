using MailKit.Net.Smtp;
using MailService.Models;
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

        public SendingMails(MailSettings mailSettings)
        {
            _mailSettings = mailSettings ?? throw new ArgumentNullException(nameof(mailSettings));
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
