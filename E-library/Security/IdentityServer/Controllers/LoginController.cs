using IdentityServer.DTOs;
using IdentityServer.Repositories.Interfaces;
using IdentityServer.AuthenticationServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace IdentityServer.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IdentityRepositoryInterface _repository;

        public LoginController(IAuthenticationService authenticationService, IdentityRepositoryInterface repository)
        {
            _authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }



        [HttpPost("[action]")]
        [ProducesResponseType(typeof(AuthenticationModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)] 
        public async Task<IActionResult> Login([FromBody]MemberCredentialsDTO memberCredentials)
        {
            var member = await _authenticationService.ValidateUser(memberCredentials);
            if (member == null)
            {
                // Authentication failed. Wrong username or password.
                return Unauthorized();
            }

            return Ok(await _authenticationService.CreateAuthenticationModel(member));
        }


        [HttpPost("[action]")]
        [ProducesResponseType(typeof(AuthenticationModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<AuthenticationModel>> Refresh([FromBody] RefreshTokenModel refreshTokenCredentials)
        {
            var member = await _repository.FindMemberByEmailOrUsename(refreshTokenCredentials.LoginName);

            if (member == null)
            {
                return Forbid();
            }

            var refreshToken = member.RefreshTokens.FirstOrDefault(r => r.Token == refreshTokenCredentials.RefreshToken);
            if (refreshToken == null)
            {
                return Unauthorized();
            }

            if (refreshToken.ExpiryTime < DateTime.Now)
            {
                return Unauthorized();
            }

            return Ok(await _authenticationService.CreateAuthenticationModel(member));
        }

        [Authorize]
        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> Logout([FromBody] RefreshTokenModel refreshTokenCredentials)
        {
            var member = await _repository.FindMemberByEmailOrUsename(refreshTokenCredentials.LoginName);
            if (member == null)
            {

                return Forbid();
            }

            await _authenticationService.RemoveRefreshToken(member, refreshTokenCredentials.RefreshToken);

            return Accepted();
        }


    }
}