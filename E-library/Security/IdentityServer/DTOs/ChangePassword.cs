using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.DTOs
{
    public class ChangePassword
    {

        [Required(ErrorMessage = "Username is required")]
        public string username { get; set; }

        [Required(ErrorMessage = "Current password is required")]
        public string password { get; set; }

        [Required(ErrorMessage = "New password is required")]
        public string newPassword { get; set; }
    }
}
