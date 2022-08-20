using EventBus.Messages.Events;
using IdentityServer.DTOs;
using IdentityServer.Repositories.Interfaces;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        private IdentityRepositoryInterface _repository;
        private ILogger<MemberController> _loger;
        private readonly IPublishEndpoint _publishEndpoint;

        public MemberController(IdentityRepositoryInterface repository, ILogger<MemberController> loger, IPublishEndpoint publishEndpoint)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _loger = loger ?? throw new ArgumentNullException(nameof(loger));
            _publishEndpoint = publishEndpoint ?? throw new ArgumentNullException(nameof(publishEndpoint));
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
        public async Task<ActionResult> Pay([FromBody] string userName)
        {
            if (User.FindFirstValue(ClaimTypes.Name) != userName)
            {
                return Forbid();
            }

            var member = await _repository.FindMember(userName);
            if (member.IsMembershipPaid == true)
            {
                return StatusCode(StatusCodes.Status200OK);
            }


            var result = await _repository.Pay(userName);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }

            PayingEvent payingEvent = new PayingEvent(member.Email, member.Name, member.Surname);

            await _publishEndpoint.Publish(payingEvent);

            return StatusCode(StatusCodes.Status200OK);

        }




        [Authorize]
        [HttpDelete("[action]/{username}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> DeleteAccount(string username)
        {
            if (User.FindFirstValue(ClaimTypes.Name) != username)
            {
                return Forbid();
            }

            var member = await _repository.FindMember(username);

            DeletingAccountEvent deletingAccountEvent = new DeletingAccountEvent(member.Email, member.Name, member.Surname);

            await _publishEndpoint.Publish(deletingAccountEvent);


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

            var member = await _repository.FindMember(changepassword.username);

            ChangePasswordEvent changePasswordEvent = new ChangePasswordEvent(member.Email, member.Name, member.Surname, changepassword.password, changepassword.newPassword);

            await _publishEndpoint.Publish(changePasswordEvent);

            return StatusCode(StatusCodes.Status200OK);
            
        }


        [Authorize]
        [HttpPut("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> CancelMembership([FromBody] string username)
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
