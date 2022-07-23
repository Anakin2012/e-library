using AutoMapper;
using Library.API.DTOs;
using Library.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Controllers
{
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

        [HttpPut]
        public async Task<IActionResult> AddLibraryItem(string id, [FromBody] LibraryItemDTO libraryDTO) {

            await _repository.AddLibraryItem(libraryDTO);

            return CreatedAtRoute("GetBooksForUser", new { id = libraryDTO.Id,libraryDTO});
        }
    }
}
