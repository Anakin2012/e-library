using AutoMapper;
using Library.API.DTOs;
using Library.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Controllers
{
    [Authorize(Roles = "Member")]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class LibraryController : ControllerBase
    {
        ILibraryRepository _repository;
        private readonly IMapper _mapper;

        public LibraryController(ILibraryRepository repository, IMapper mapper)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }


        [HttpGet("{username}", Name="GetBooksForUser")]
        [ProducesResponseType(typeof(LibraryItemDTO), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(IEnumerable<LibraryItemDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<LibraryItemDTO>>> GetBooksForUser( string username) {
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
    }
}
