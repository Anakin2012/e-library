using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.DTOs
{
    public class MemberCredentialsDTO
    {
        [Required(ErrorMessage = "Username or email address is required")]
        public string LoginName { get; set; } // email adresa ili username

        [Required(ErrorMessage = "Password name is required")]
        public string Password { get; set; }
    }
}
