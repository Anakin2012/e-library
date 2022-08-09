using Microsoft.Extensions.Logging;
using MimeKit;
using Ordering.Application.Contracts.Infrastructure;
using Ordering.Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using MailKit.Net.Smtp;

namespace Ordering.Infrastructure.Mail
{
    public class EmailService : IEmailService
    {
        private readonly ILogger<EmailService> _logger;
        private readonly EmailConfiguration _mailConfiguration;

        public EmailService(ILogger<EmailService> logger, EmailConfiguration mailConfiguration)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mailConfiguration = mailConfiguration ?? throw new ArgumentNullException(nameof(mailConfiguration));
        }

        public async Task<bool> SendEmail(Email emailRequest) {
            var email = new MimeMessage();

            email.Sender = MailboxAddress.Parse(_mailConfiguration.Mail);
            email.To.Add(MailboxAddress.Parse(emailRequest.Receiver));
            email.Subject = emailRequest.Title;

            var builder = new BodyBuilder();
            builder.HtmlBody = emailRequest.Body;
            builder.TextBody = emailRequest.Body;
            email.Body = builder.ToMessageBody();

            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect(_mailConfiguration.Host, _mailConfiguration.Port, MailKit.Security.SecureSocketOptions.StartTls);

            smtp.Authenticate(_mailConfiguration.Mail, _mailConfiguration.Password);

            try
            {
                _logger.LogInformation("Sending email via SMTP server {serverName}", _mailConfiguration.Host);
                await smtp.SendAsync(email);
            }
            catch (Exception e)
            {
                _logger.LogInformation("An error had occured when sending email via SMTP server {ServerName}: {ErrorMessage}", _mailConfiguration.Host, e.Message);
                return false;
            }
            finally
            {
                smtp.Disconnect(true);
            }

            return true;



        }


    }
}
