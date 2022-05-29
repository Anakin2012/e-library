using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.API.DTOs
{
    public class BaseIdentityBookDTO : BaseBookDTO
    {
        public string Id { get; set; }
    }
}
