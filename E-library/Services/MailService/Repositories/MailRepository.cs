using MailService.Data;
using MailService.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.Repositories
{
    public class MailRepository : IMailRepository
    {

        private readonly IMailContext _context;

        public MailRepository(IMailContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Mail>> GetMails() {

            return await _context.Mails.Find(p => true).ToListAsync();

        }
        public async Task<Mail> GetMail(string id) {
            return await _context.Mails.Find(p => p.Id == id).FirstOrDefaultAsync();
        }
    }
}
