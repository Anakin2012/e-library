﻿using IdentityServer.Data;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IdentityServer.AuthenticationServices
{
    public class AuthenticationService : IAuthenticationService
    {

        private readonly UserManager<Member> _memberManager;
        private readonly IConfiguration _configuration;

        public AuthenticationService(UserManager<Member> memberManager, IConfiguration configuration)
        {
            _memberManager = memberManager ?? throw new ArgumentNullException(nameof(memberManager));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<Member> ValidateUser(MemberCredentialsDTO memberCredentials)
        {
            // dodati da moze da credentials sadrzi i mejl, pa da korisnik moze da se prijavljuje i putem mejla
            var member = await _memberManager.FindByNameAsync(memberCredentials.UserName);

            if (member == null || !await _memberManager.CheckPasswordAsync(member, memberCredentials.Password))
            {
                return null;
            }
            return member;
        }


        public async Task<AuthenticationModel> CreateAuthenticationModel(Member member)
        {
            var accessToken = await CreateAccessToken(member);

            return new AuthenticationModel { AccessToken = accessToken };
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
            };

            // token ce imati i informacije o ulogama
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

    }
}