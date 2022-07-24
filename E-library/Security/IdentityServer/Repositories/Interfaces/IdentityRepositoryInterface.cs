using IdentityServer.DTOs;
using IdentityServer.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Repositories.Interfaces
{
    public interface IdentityRepositoryInterface
    {
        public Task<IdentityResult> RegisterMemberEmail(NewMemberEmailDTO newMember);
        public Task<IdentityResult> RegisterPremiumMemberEmail(NewMemberEmailDTO newMember);
        public Task<IdentityResult> RegisterAdministratorEmail(NewMemberEmailDTO newMember);
        public Task<Member> FindMember(string UserName);

    }
}
