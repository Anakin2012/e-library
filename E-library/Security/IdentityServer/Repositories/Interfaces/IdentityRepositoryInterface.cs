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
        public Task<IdentityResult> RegisterMemberEmail(NewMemberDTO newMember);
        public Task<IdentityResult> RegisterPremiumMemberEmail(NewMemberDTO newMember);
        public Task<IdentityResult> RegisterAdministratorEmail(NewMemberDTO newMember);
        public Task<Member> FindMember(string UserName);
        public Task<IEnumerable<MemberDetailsDTO>> GetMembers();
        public Task<MemberDetailsDTO> GetMember(string UserName);
        public Task<IdentityResult> DeleteMember(string username);
    }
}
