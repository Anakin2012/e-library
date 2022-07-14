using AutoMapper;
using Catalog.API.DTOs;
using Catalog.API.Entities;
using Catalog.API.Repositories.Interfaces;
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
    // nalepice Catalog umesto sablona u uglastima zagradama
    // template koji definise na kom urlu kontroler prihvata zahteve
    public class CatalogController : ControllerBase
    {
        IBookRepository _repository;
        private readonly IMapper _mapper;

        public CatalogController(IBookRepository repository, IMapper mapper)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }


        [HttpGet] // koji http zahtev implementira ovaj metod
        [ProducesResponseType(typeof(IEnumerable<Book>), StatusCodes.Status200OK)]
        // shema povratne vrednosti i ocekivani statusni kod 
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var books = await _repository.GetBooks();
            return Ok(books);
        }

        [HttpGet("{id}", Name = "GetBook")]
        [ProducesResponseType(typeof(Book), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Book), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Book>> GetBookById(string id)
        {
            var book = await _repository.GetBook(id);
            if (book == null)
            {
                return NotFound(null);
            }
            return Ok(book);
        }

        [Route("[action]/{genre}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Book>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooksByGenre(string genre)
        {
            var books = await _repository.GetBooksByGenre(genre);
            return Ok(books);
        }

        [HttpPost]
        [ProducesResponseType(typeof(BookDTO), StatusCodes.Status201Created)]
        public async Task<ActionResult<BookDTO>> CreateBook([FromBody] CreateBookDTO bookDTO)
        {
            await _repository.CreateBook(bookDTO);

            return CreatedAtRoute("GetBook", new { id = bookDTO.Id }, bookDTO);
        }

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


        [HttpDelete("{id:length(24)}", Name = "DeleteBook")]
        [ProducesResponseType(typeof(Book), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteBookById(string id)
        {
            return Ok(await _repository.DeleteBook(id));
        }
    }

}
