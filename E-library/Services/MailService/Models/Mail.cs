using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.Models
{
    public class Mail
    {
        [EmailAddress]
        public string From { get; set; }
        [EmailAddress]
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public DateTime MailReceived { get; set; }
    }
}
