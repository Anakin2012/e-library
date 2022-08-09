using MailService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.Repositories
{
    public interface IMailRepository
    {
        public Task<IEnumerable<Mail>> GetMails();
        public Task<Mail> GetMail(string id);
    }
}
