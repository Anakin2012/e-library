using AutoMapper;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using IdentityServer.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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



        private async Task<IdentityResult> RegisterEmail(NewMemberDTO newMember, IEnumerable<string> roles)
        {
            var member = _mapper.Map<Member>(newMember);

            var memberUserName = _memberManager.FindByNameAsync(member.UserName);
            if (memberUserName != null) {
                IdentityError[] errors = new IdentityError[] { };
                errors.Append(new IdentityErrorDescriber().DuplicateUserName(member.UserName));

                return IdentityResult.Failed(errors);
            }

            IdentityResult result = await _memberManager.CreateAsync(member, newMember.Password);
            if (!result.Succeeded)
                return result;


            // dodeljivanje uloga tom korisniku
            foreach (var role in roles)
            {
                var roleExists = await _roleManager.RoleExistsAsync(role);
                if (roleExists)
                    await _memberManager.AddToRoleAsync(member, role);
            }

            return result;
        }




        public async Task<IdentityResult> RegisterAdministratorEmail(NewMemberDTO newMember)
        {
            return await RegisterEmail(newMember, new string[] { "Administrator" });
        }


        public async Task<IdentityResult> RegisterMemberEmail(NewMemberDTO newMember)
        {
            return await RegisterEmail(newMember, new string[] { "Member" });
        }



        public async Task<IdentityResult> RegisterPremiumMemberEmail(NewMemberDTO newMember)
        {
            return await RegisterEmail(newMember, new string[] { "PremiumMember" });
        }


        public async Task<Member> FindMember(string UserName) {
            var member =  await _memberManager.FindByNameAsync(UserName);
            return member;
        }

        public async Task<IEnumerable<MemberDetailsDTO>> GetMembers() {
            var members = await _memberManager.Users.ToListAsync();
            return _mapper.Map<IEnumerable<MemberDetailsDTO>>(members);
        }

        public async Task<MemberDetailsDTO> GetMember(string UserName) {
            var member = await _memberManager.Users.FirstOrDefaultAsync(member => member.UserName == UserName);
            return _mapper.Map<MemberDetailsDTO>(member);
        }

        public async Task<IdentityResult> DeleteMember(string username) {
            var member = await _memberManager.FindByNameAsync(username);
            if (member == null)
            {
                IdentityError[] errors = new IdentityError[] { };
                errors.Append(new IdentityErrorDescriber().InvalidUserName(username));

                return IdentityResult.Failed(errors);

            }
            else {
                var result = await _memberManager.DeleteAsync(member);
                return result;
            }
        }

        public async Task<IdentityResult> ChangePassword(string username, string currentPassword, string newPassword)
        {
            var member = await _memberManager.FindByNameAsync(username);
            if (member == null)
            {
                IdentityError[] errors = new IdentityError[] { };
                errors.Append(new IdentityErrorDescriber().InvalidUserName(username));

                return IdentityResult.Failed(errors);

            }
            else
            {
                var result = await _memberManager.ChangePasswordAsync(member, currentPassword, newPassword);
                return result;
            }
        }

        // proveriti da li je onda u redu logovanje
        public async Task<IdentityResult> ChangeUserName(string currentUsername, string newUsername) {

            var exists_new_username = await _memberManager.FindByNameAsync(newUsername);

            if (exists_new_username != null) {
                IdentityError[] errors = new IdentityError[] { };
                errors.Append(new IdentityErrorDescriber().DuplicateUserName(newUsername));

                return IdentityResult.Failed(errors);
            }

            Member member = await _memberManager.FindByNameAsync(currentUsername);

            member.UserName = newUsername;

            var result = await _memberManager.UpdateAsync(member);

            return result;

        }

    }
}
