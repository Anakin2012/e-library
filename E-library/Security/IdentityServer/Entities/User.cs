using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Entities
{
    public class User : IdentityUser<int>
    {
        
        public string Name { get; set; }
        public string Surname { get; set; }

        public User()
        {
        }

        public User(string userName) : base(userName)
        {
        }
    }
}
