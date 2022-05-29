using AutoMapper;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using IdentityServer.Repositories.Interfaces;
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
    public class AdministratorController : ControllerBase
    {
        private readonly IdentityRepositoryInterface _repository;

        public AdministratorController(IdentityRepositoryInterface repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterAdministrator([FromBody] NewMemberDTO newUser)
        {
            var result = await _repository.RegisterAdministrator(newUser);
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




    }
}
