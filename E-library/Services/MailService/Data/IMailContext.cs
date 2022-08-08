using MailService.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.Data
{
    public interface IMailContext
    {

        IMongoCollection<Mail> Mails { get; }

    }
}
