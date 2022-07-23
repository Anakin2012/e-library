using IdentityServer.DTOs;
using IdentityServer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.AuthenticationServices
{
    public interface IAuthenticationService
    {
        Task<Member> ValidateUser(MemberCredentialsDTO memberCredentials); 
        Task<AuthenticationModel> CreateAuthenticationModel(Member member);
        Task RemoveRefreshToken(Member member, string refreshToken);


    }
}
