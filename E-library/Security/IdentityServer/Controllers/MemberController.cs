using IdentityServer.DTOs;
using IdentityServer.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IdentityServer.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        IdentityRepositoryInterface _repository;
        

        public MemberController(IdentityRepositoryInterface repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        [Authorize]
        [HttpGet("{UserName}")]
        [ProducesResponseType(typeof(MemberDetailsDTO), StatusCodes.Status200OK)]
        public async Task<ActionResult<MemberDetailsDTO>> GetMember(string UserName)
        {
            var memberDetails = await _repository.GetMember(UserName);
            return Ok(memberDetails);
        }


        [Authorize]
        [HttpPut("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> Pay(string username)
        {
            if (User.FindFirstValue(ClaimTypes.Name) != username)
            {
                return Forbid();
            }

            var result = await _repository.Pay(username);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }

            return StatusCode(StatusCodes.Status200OK);

        }




        [Authorize]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> DeleteAccount(string username)
        {
            if (User.FindFirstValue(ClaimTypes.Name) != username)
            {
                return Forbid();
            }

            var result = await _repository.DeleteMember(username);

            if (!result.Succeeded) {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }

            return StatusCode(StatusCodes.Status200OK);

        }

        [Authorize]
        [HttpPut("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePassword changepassword) {

            if (User.FindFirstValue(ClaimTypes.Name) != changepassword.username)
            {
                return Forbid();
            }

            var result = await _repository.ChangePassword(changepassword.username, changepassword.password, changepassword.newPassword);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }

            return StatusCode(StatusCodes.Status200OK);
            
        }


        [Authorize]
        [HttpPut("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> CancelMembership(string username)
        {
            if (User.FindFirstValue(ClaimTypes.Name) != username)
            {
                return Forbid();
            }

            var result = await _repository.CancelMembership(username);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }

            return StatusCode(StatusCodes.Status200OK);

        }


    }
}
