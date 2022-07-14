using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog.API.DTOs
{
    public class BaseIdentityBookDTO : BaseBookDTO
    {
        // [BsonId]
        // [BsonElement("_id")]

        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
