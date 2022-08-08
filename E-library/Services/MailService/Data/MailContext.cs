using MailService.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.Data
{
    public class MailContext : IMailContext
    {

        public MailContext(IConfiguration configuration) {
            var client = new MongoClient(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
            var database = client.GetDatabase("MailDB");

            Mails = database.GetCollection<Mail>("Mails");
        }

        public IMongoCollection<Mail> Mails { get; }
    }
}
