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
        //[BsonRepresentation(BsonType.ObjectId)]
       // [BsonElement("_id")]
        public string Id { get; set; }
    }
}
