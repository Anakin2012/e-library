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

        public CatalogController(IBookRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        [HttpGet] // koji http zahtev implementira ovaj metod
        [ProducesResponseType(typeof(IEnumerable<Book>), StatusCodes.Status200OK)] 
        // shema povratne vrednosti i ocekivani statusni kod 
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var books = await _repository.GetBooks();
            return Ok(books);
        }
    }
}
