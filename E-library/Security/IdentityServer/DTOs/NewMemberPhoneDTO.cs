using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.DTOs
{
    public class NewMemberPhoneDTO
    {

        [Required(ErrorMessage = "First Name is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Last Name is required.")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Username is required.")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }

        [Phone(ErrorMessage = "Invalid Phone Number")]
        [Required(ErrorMessage = "Phone Number is required.")]
        public string PhoneNumber { get; set; }
    }
}
