using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Entities
{
    public class User : IdentityUser<int>
    {
        // TO DO: korisnik moze da se registruje putem imejla ili mobilnog telefona (mozda i fb)
        // TO DO: dodati polje koje oznacava datum kada se korisnik uclanio u biblioteku
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
