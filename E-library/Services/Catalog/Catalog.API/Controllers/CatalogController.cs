using AutoMapper;
using Catalog.API.DTOs;
using Catalog.API.Entities;
using Catalog.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CatalogController : ControllerBase
    {
        IBookRepository _repository;
        private readonly IMapper _mapper;

        public CatalogController(IBookRepository repository, IMapper mapper)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [Route("[action]")]
        [HttpGet] 
        [ProducesResponseType(typeof(IEnumerable<BookDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetBooks()
        {
            var books = await _repository.GetBooks();
            return Ok(books);
        }

        [Route("[action]/{id}", Name ="GetBookById")]
        [HttpGet]
        [ProducesResponseType(typeof(BookDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(BookDTO), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BookDTO>> GetBookById(string id)
        {
            var book = await _repository.GetBook(id);
      
            if (book == null)
            {
                return NotFound(null);
            }
            return Ok(book);
        }

        [Route("[action]/{count}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<BookDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetBooksByRentCount(int count)
        {
            var books = await _repository.GetBooksByRentCount(count);
            return Ok(books);
        }


        [Route("[action]/{genre}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<BookDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetBooksByGenre(string genre)
        {
            var books = await _repository.GetBooksByGenre(genre);
            return Ok(books);
        }

        [Route("[action]/{author}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<BookDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetBooksByAuthor(string author)
        {
            var books = await _repository.GetBooksByAuthor(author);
            return Ok(books);
        }

        [Route("[action]/{title}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<BookDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetBooksByTitle(string title)
        {
            var books = await _repository.GetBooksByTitle(title);
            return Ok(books);
        }

        [Authorize(Roles = "Administrator")]
        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType(typeof(BookDTO), StatusCodes.Status201Created)]
        public async Task<ActionResult<BookDTO>> CreateBook([FromBody] CreateBookDTO bookDTO)
        {
            await _repository.CreateBook(bookDTO);

            return CreatedAtRoute("GetBookById", new { id = bookDTO.Id }, bookDTO);
        }

        [Authorize(Roles = "Administrator")]
        [Route("[action]/{id}")]
        [HttpPut]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateBook(string id, [FromBody] UpdateBookDTO bookDTO)
        {
            var book = await _repository.GetBook(id);
            if (book is null)
            {
                return NotFound();
            }
            bookDTO.Id = book.Id;

            return Ok(await _repository.UpdateBook(id, bookDTO));
        }

        [Authorize(Roles = "Administrator")]
        [Route("[action]/{id:length(24)}")]
        [HttpDelete]
        [ProducesResponseType(typeof(BookDTO), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteBookById(string id)
        {
            return Ok(await _repository.DeleteBook(id));
        }
    }

}
