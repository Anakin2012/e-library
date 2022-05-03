using AutoMapper;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {

        private readonly UserManager<Member> _memberManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;

        public RegistrationController(UserManager<Member> memberManager, RoleManager<Role> roleManager, IMapper mapper)
        {
            _memberManager = memberManager ?? throw new ArgumentNullException(nameof(memberManager));
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }



        
        private async Task<IActionResult> RegisterWithRoles(NewMemberDTO newMember, IEnumerable<string> roles)
        {
            var member = _mapper.Map<Member>(newMember);
            
            IdentityResult result = await _memberManager.CreateAsync(member, newMember.Password);
            if (!result.Succeeded) {
                foreach (var error in result.Errors) {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }


            foreach (var role in roles)
            {
                var roleExists = await _roleManager.RoleExistsAsync(role);
                if (roleExists)
                    await _memberManager.AddToRoleAsync(member, role);
            }


            return StatusCode(StatusCodes.Status201Created);


        }



        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterMember([FromBody] NewMemberDTO newMember)
        {
            return await RegisterWithRoles(newMember, new string[] { "Member" });
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterPremiumMember([FromBody] NewMemberDTO newMember)
        {
            return await RegisterWithRoles(newMember, new string[] { "PremiumMember" });
        }


        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterAdministrator([FromBody] NewMemberDTO newMember)
        {
            return await RegisterWithRoles(newMember, new string[] { "Administrator" });
        }





    }
}
