using IdentityServer.DTOs;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Repositories.Interfaces
{
    public interface IdentityRepositoryInterface
    {
        public Task<IdentityResult> RegisterMember(NewMemberDTO newUser);
        public Task<IdentityResult> RegisterPremiumMember(NewMemberDTO newUser);
        public Task<IdentityResult> RegisterAdministrator(NewMemberDTO newUser);
    }
}
