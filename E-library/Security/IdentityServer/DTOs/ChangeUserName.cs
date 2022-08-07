using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.DTOs
{
    public class ChangeUserName
    {
        [Required(ErrorMessage = "New username is required")]
        public string newUserName { get; set; }
    }
}
