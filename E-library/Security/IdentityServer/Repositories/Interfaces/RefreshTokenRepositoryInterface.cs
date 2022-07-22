using IdentityServer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Repositories.Interfaces
{
    public interface RefreshTokenRepositoryInterface
    {
        public Task AddRefreshToken(RefreshToken refreshToken);
        public Task AddRefreshTokenToMember(Member member, RefreshToken refreshToken);
        public Task RemoveRefreshTokens(Member member, string token);

    }
}
