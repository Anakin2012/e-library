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



        private async Task<IdentityResult> RegisterEmail(NewMemberEmailDTO newMember, IEnumerable<string> roles)
        {
            var user = _mapper.Map<Member>(newMember);

            IdentityResult result = await _memberManager.CreateAsync(user, newMember.Password);
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


        private async Task<IdentityResult> RegisterPhone(NewMemberPhoneDTO newMember, IEnumerable<string> roles)
        {
            var user = _mapper.Map<Member>(newMember);

            IdentityResult result = await _memberManager.CreateAsync(user, newMember.Password);
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


        public async Task<IdentityResult> RegisterAdministratorEmail(NewMemberEmailDTO newMember)
        {
            return await RegisterEmail(newMember, new string[] { "Administrator" });
        }

        public async Task<IdentityResult> RegisterAdministratorPhone(NewMemberPhoneDTO newMember)
        {
            return await RegisterPhone(newMember, new string[] { "Administrator" });
        }

        public async Task<IdentityResult> RegisterMemberEmail(NewMemberEmailDTO newMember)
        {
            return await RegisterEmail(newMember, new string[] { "Member" });
        }

        public async Task<IdentityResult> RegisterMemberPhone(NewMemberPhoneDTO newMember)
        {
            return await RegisterPhone(newMember, new string[] { "Member" });
        }


        public async Task<IdentityResult> RegisterPremiumMemberEmail(NewMemberEmailDTO newMember)
        {
            return await RegisterEmail(newMember, new string[] { "PremiumMember" });
        }

        public async Task<IdentityResult> RegisterPremiumMemberPhone(NewMemberPhoneDTO newMember)
        {
            return await RegisterPhone(newMember, new string[] { "PremiumMember" });
        }


        public async Task<Member> FindMember(string UserName) {
            var member =  await _memberManager.FindByNameAsync(UserName);
            return member;
        }


    }
}
