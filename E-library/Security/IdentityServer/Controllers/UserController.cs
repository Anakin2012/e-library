using IdentityServer.DTOs;
using IdentityServer.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IdentityRepositoryInterface _repository;

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<MemberDetailsDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<MemberDetailsDTO>>> GetAllMembers()
        {
            var membersDetails = await _repository.GetMembers();
            return Ok(membersDetails);
        }

        [HttpGet("{UserName}")]
        [ProducesResponseType(typeof(MemberDetailsDTO), StatusCodes.Status200OK)]
        public async Task<ActionResult<MemberDetailsDTO>> GetMember(string UserName)
        {
            var memberDetails = await _repository.GetMember(UserName);
            return Ok(memberDetails);
        }

    }
}
