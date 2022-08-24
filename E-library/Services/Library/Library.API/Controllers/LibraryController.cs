using AutoMapper;
using Library.API.DTOs;
using Library.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Linq;
using System.Threading.Tasks;
using EventBus.Messages.Events;
using MassTransit;

namespace Library.API.Controllers
{
    [Authorize(Roles = "Member, PremiumMember")]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class LibraryController : ControllerBase
    {
        ILibraryRepository _repository;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public LibraryController(ILibraryRepository repository, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _publishEndpoint = publishEndpoint ?? throw new ArgumentNullException(nameof(publishEndpoint));
        }


        [Route("[action]/{username}")]
        [HttpGet]
        [ProducesResponseType(typeof(LibraryItemDTO), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(IEnumerable<LibraryItemDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<LibraryItemDTO>>> GetBooksForUser( string username) {

            if (User.FindFirst(ClaimTypes.Name).Value != username)
            {
                return Forbid();
            }
   

            var libraryItems = await _repository.GetAllBooksForUser(username);
            if (libraryItems == null)
                return NotFound(null);
            return Ok(libraryItems);
        }


        [HttpPost]
        public async Task<IActionResult> AddLibraryItem([FromBody] LibraryItemDTO libraryDTO) {

            await _repository.AddLibraryItem(libraryDTO);

            return CreatedAtRoute("GetBooksForUser", new { Username = libraryDTO.Username }, libraryDTO);
        }

        [HttpDelete]
        public async Task<IActionResult> CleanLibraryForUser(string username) {

            return Ok(await _repository.DeleteLibraryItems(username));
        }

        [Route("[action]/{libItemId}")]
        [HttpPut]
        [ProducesResponseType(typeof(IEnumerable<LibraryItemDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<LibraryItemDTO>>> RemoveBookFromLibrary(string libItemId)
        {

            LibraryItemDTO item = await _repository.GetLibraryItem(libItemId);



            if (User.FindFirst(ClaimTypes.Name).Value != item.Username)
            {
                return Forbid();
            }

            var eventMessage = new RemoveBookFromLibraryEvent(item.BookId);

            await _publishEndpoint.Publish(eventMessage);
            await _repository.DeleteLibraryItem(item.Id);
            return Ok(await _repository.GetAllBooksForUser(item.Username));
        }

    }
}
