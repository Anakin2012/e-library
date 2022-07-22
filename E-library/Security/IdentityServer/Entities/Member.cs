using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Entities
{
    public class Member : IdentityUser<int>
    {
        
        public string Name { get; set; }
        public string Surname { get; set; }
        public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();


        public Member()
        {
        }

        public Member(string userName) : base(userName)
        {
        }
    }
}
