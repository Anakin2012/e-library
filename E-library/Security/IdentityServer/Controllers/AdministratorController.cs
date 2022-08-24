using AutoMapper;
using EventBus.Messages.Events;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using IdentityServer.Repositories.Interfaces;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Controllers
{
    [Route("/api/v1/[controller]")]
    [ApiController]
 //   [Authorize(Roles = "Administrator")]
    public class AdministratorController : ControllerBase
    {
        private readonly IdentityRepositoryInterface _repository;
        private readonly IPublishEndpoint _publishEndpoint;  // za slanje eventa na red poruka

        public AdministratorController(IdentityRepositoryInterface repository, IPublishEndpoint publishEndpoint)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _publishEndpoint = publishEndpoint ?? throw new ArgumentNullException(nameof(publishEndpoint));
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterAdministrator([FromBody] NewMemberDTO newMember)
        {
            var result = await _repository.RegisterAdministratorEmail(newMember);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<MemberDetailsDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<MemberDetailsDTO>>> GetAllMembers()
        {
            var membersDetails = await _repository.GetMembers();
            return Ok(membersDetails);
        }

        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<MemberDetailsAdminDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<MemberDetailsAdminDTO>>> GetAllMembersDetails()
        {
            var membersDetails = await _repository.GetAllMembersDetails();
            return Ok(membersDetails);
        }


        [HttpPut("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddCredentialsToMember([FromBody] AddCredentialsDTO addCredentials)
        {
            var result = await _repository.AddCredentialsToMember(addCredentials.UserName, addCredentials.Credentials);

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

        [HttpPut("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> CancelMembershipOfMember([FromBody] UserNameDTO userNameDTO)
        {
            var member = await _repository.FindMember(userNameDTO.UserName);

            DateTime dm = member.DateMembership.AddDays(30);

            if (dm <= DateTime.Now)
            {
                var result = await _repository.CancelMembership(userNameDTO.UserName);

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
            else {

                return Forbid();
            }

        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SendMembershipExpiringMail([FromBody] MemberDetailsDTO memberDetailsDTO)
        {

            MembershipExpiringEvent membershipExpiring = new MembershipExpiringEvent(memberDetailsDTO.Email, memberDetailsDTO.Name, memberDetailsDTO.Surname, memberDetailsDTO.UserName);

            await _publishEndpoint.Publish(membershipExpiring);


            return Accepted();
        }


    }
}
