﻿using AutoMapper;
using EventBus.Messages.Events;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using IdentityServer.Repositories.Interfaces;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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

        private readonly IdentityRepositoryInterface _repository;
        private readonly ILogger<RegistrationController> _logger;
        
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;  // za slanje eventa na red poruka

        public RegistrationController(IdentityRepositoryInterface repository, ILogger<RegistrationController> logger, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _publishEndpoint = publishEndpoint ?? throw new ArgumentNullException(nameof(publishEndpoint));
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterMember([FromBody] NewMemberDTO newMember)
        {
            var result = await _repository.RegisterMemberEmail(newMember);

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



        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterPremiumMember([FromBody] NewMemberDTO newMember)
        {
            var result = await _repository.RegisterPremiumMemberEmail(newMember);
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

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SendMembershipExpiringMail([FromBody] MemberDetailsDTO memberDetailsDTO) {
            // salje se 3 dana pre isteka clanarine

            MembershipExpiringEvent membershipExpiring = new MembershipExpiringEvent(memberDetailsDTO.Email, "ELibrary@elibrary.com", memberDetailsDTO.FirstName, memberDetailsDTO.LastName, memberDetailsDTO.UserName);

            await _publishEndpoint.Publish(membershipExpiring);


            return Accepted();
        }



    }
}