using IdentityServer.Data;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using IdentityServer.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace IdentityServer.AuthenticationServices
{
    public class AuthenticationService : IAuthenticationService
    {

        private readonly UserManager<Member> _memberManager;
        private readonly IConfiguration _configuration;
        private readonly RefreshTokenRepositoryInterface _repository;

        public AuthenticationService(UserManager<Member> memberManager, IConfiguration configuration, RefreshTokenRepositoryInterface repository)
        {
            _memberManager = memberManager ?? throw new ArgumentNullException(nameof(memberManager));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public async Task<Member> ValidateUser(MemberCredentialsDTO memberCredentials)
        {
            bool isEmail = false;
            
            if (memberCredentials.LoginName.Contains('@')) {
                isEmail = true;
            }

            Member member;

            if (isEmail) {
                member = await _memberManager.FindByEmailAsync(memberCredentials.LoginName);
            }
            else {
                member = await _memberManager.FindByNameAsync(memberCredentials.LoginName);
            }

            if (member == null || !await _memberManager.CheckPasswordAsync(member, memberCredentials.Password))
            {
                return null;
            }
            return member;
        }


        public async Task<AuthenticationModel> CreateAuthenticationModel(Member member)
        {
            var accessToken = await CreateAccessToken(member);
            var refreshToken = await CreateRefreshToken();

            await _repository.AddRefreshTokenToMember(member, refreshToken);

            return new AuthenticationModel { AccessToken = accessToken, RefreshToken = refreshToken.Token };
        }


        public async Task RemoveRefreshToken(Member member, string refreshToken)
        {

            await _repository.RemoveRefreshTokens(member, refreshToken);

        }



        private async Task<string> CreateAccessToken(Member member)
        {
            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaims(member);
            var token = GenerateToken(signingCredentials, claims);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JwtSettings:secretKey"));
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<IEnumerable<Claim>> GetClaims(Member member)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, member.UserName),
                new Claim(ClaimTypes.Email, member.Email),
                new Claim(ClaimTypes.Expired, (!member.IsMembershipPaid).ToString()),
                new Claim("membership-paid-until", member.DateMembership.AddDays(30).ToShortDateString())
            };

            var roles = await _memberManager.GetRolesAsync(member);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }

        private JwtSecurityToken GenerateToken(SigningCredentials signingCredentials, IEnumerable<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var token = new JwtSecurityToken
            (
                issuer: jwtSettings.GetSection("validIssuer").Value,
                audience: jwtSettings.GetSection("validAudience").Value,
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("expires").Value)),
                signingCredentials: signingCredentials
            );

            return token;
        }

        private async Task<RefreshToken> CreateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomNumber);

            var token = new RefreshToken
            {
                Token = Convert.ToBase64String(randomNumber),
                ExpiryTime = DateTime.Now.AddDays(Convert.ToDouble(_configuration.GetValue<string>("RefreshTokenExpires")))
            };

            await _repository.AddRefreshToken(token);

            return token;
        }


    }
}
