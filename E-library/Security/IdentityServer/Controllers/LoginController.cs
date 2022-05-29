using IdentityServer.DTOs;
using IdentityServer.Repositories.Interfaces;
using IdentityServer.AuthenticationServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Controllers
{
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
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]  // korisnik nije uspeo da se autentifikuje
        public async Task<IActionResult> Login([FromBody]MemberCredentialsDTO memberCredentials)
        {
            var user = await _authenticationService.ValidateUser(memberCredentials);
            if (user == null)
            {
                // Authentication failed. Wrong username or password.
                return Unauthorized();
            }

            return Ok(await _authenticationService.CreateAuthenticationModel(user));
        }
    }
}