using IdentityServer.Data;
using IdentityServer.Entities;
using IdentityServer.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Repositories
{
    public class RefreshTokenRepository : RefreshTokenRepositoryInterface
    {
        private readonly IdentityContext _context;
        private readonly UserManager<Member> _memberManager;

         public async Task AddRefreshToken(RefreshToken refreshToken) {
            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

        }

        public async Task AddRefreshTokenToMember(Member member, RefreshToken refreshToken) {
            member.RefreshTokens.Add(refreshToken);
            await _memberManager.UpdateAsync(member);

        }

        public async Task RemoveRefreshTokens(Member member, string refreshToken) {
            member.RefreshTokens.RemoveAll(r => r.Token == refreshToken);

            await _memberManager.UpdateAsync(member);

            var token = _context.RefreshTokens.FirstOrDefault(r => r.Token == refreshToken);
            if (token == null)
            {
                return;
            }

            _context.RefreshTokens.Remove(token);
            await _context.SaveChangesAsync();
        }


    }
}
