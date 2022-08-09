using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.DTOs
{
    public class UserNameDTO
    {
        [Required(ErrorMessage = "Username is required")]
        public string UserName { get; set; }
    }
}
