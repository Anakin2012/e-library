using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.DTOs
{
    public class RefreshTokenModel
    {
        public string LoginName { get; set; }  // username ili email
        public string RefreshToken { get; set; }
    }
}