using AutoMapper;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using IdentityServer.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Repositories
{
    public class IdentityRepository : IdentityRepositoryInterface
    {

        private readonly UserManager<Member> _memberManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;


        public IdentityRepository(UserManager<Member> memberManager, RoleManager<Role> roleManager, IMapper mapper)
        {
            _memberManager = memberManager ?? throw new ArgumentNullException(nameof(memberManager));
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }



        private async Task<IdentityResult> RegisterUser(NewMemberDTO newUser, IEnumerable<string> roles)
        {
            var user = _mapper.Map<Member>(newUser);

            IdentityResult result = await _memberManager.CreateAsync(user, newUser.Password);
            if (!result.Succeeded)
                return result;


            // dodeljivanje uloga tom korisniku
            foreach (var role in roles)
            {
                var roleExists = await _roleManager.RoleExistsAsync(role);
                if (roleExists)
                    await _memberManager.AddToRoleAsync(user, role);
            }

            return result;
        }


        public async Task<IdentityResult> RegisterAdministrator(NewMemberDTO newUser)
        {
            return await RegisterUser(newUser, new string[] { "Administrator" });
        }

        public async Task<IdentityResult> RegisterMember(NewMemberDTO newUser)
        {
            return await RegisterUser(newUser, new string[] { "Member" });
        }

        public async Task<IdentityResult> RegisterPremiumMember(NewMemberDTO newUser)
        {
            return await RegisterUser(newUser, new string[] { "PremiumMember" });
        }


    }
}
