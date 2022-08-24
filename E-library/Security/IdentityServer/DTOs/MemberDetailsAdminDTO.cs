using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.DTOs
{
    public class MemberDetailsAdminDTO
    {
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public double Credentials { get; set; }
        public DateTime DateMembership { get; set; }
        public bool IsMembershipPaid { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
    }
}