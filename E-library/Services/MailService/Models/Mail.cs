using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.Entities
{
    public class Mail
    {

        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string EmailAddress { get; set; }
        public string Sender { get; set; }
        public string Subject { get; set; }
        public string MailBody { get; set;  }
        public bool isRead { get; set;  }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime TimeRecieved { get; set; }


    }
}
