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
    public class MemberController : ControllerBase
    {
        IdentityRepositoryInterface _repository;

        [HttpGet("{UserName}")]
        [ProducesResponseType(typeof(MemberDetailsDTO), StatusCodes.Status200OK)]
        public async Task<ActionResult<MemberDetailsDTO>> GetMember(string UserName)
        {
            var memberDetails = await _repository.GetMember(UserName);
            return Ok(memberDetails);
        }

    }
}
