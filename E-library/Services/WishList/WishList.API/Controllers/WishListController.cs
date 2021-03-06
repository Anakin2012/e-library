using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WishList.API.Entities;
using WishList.API.Repositories;
using WishList.API.Services;

namespace WishList.API.Controllers
{   [ApiController]
    [Route("api/v1/[controller]")]
    public class WishListController : ControllerBase
    {
        private readonly IWishListRepository _repository;
        private readonly IWishListService _service;

        public WishListController(IWishListRepository repository, IWishListService service)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _service = service ?? throw new ArgumentNullException(nameof(repository));
        }
        [HttpGet("{username}")]
        [ProducesResponseType(typeof(WishBookList), StatusCodes.Status200OK)]
        public async Task<ActionResult<WishBookList>> GetList(string username) { 
            var basket = await _repository.GetList(username);
            return Ok(basket ?? new WishBookList(username));
        }

        [HttpGet("recommendByAuthor/{username}")]
        [ProducesResponseType(typeof(WishBookList), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ListItem>>> GetRecommendationsByAuthor(string username)
        {
            var recommendations = await _service.getRecommendationsByAuthor(username);
            return Ok(recommendations);
        }
        
        [HttpGet("recommendByGenre/{username}")]
        [ProducesResponseType(typeof(WishBookList), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ListItem>>> GetRecommendationsByGenre(string username)
        {
            var recommendations = await _service.getRecommendationsByGenre(username);
            return Ok(recommendations);
        }

        [HttpPut]
        [ProducesResponseType(typeof(WishBookList), StatusCodes.Status200OK)]
        public async Task<ActionResult<WishBookList>> UpdateList(WishBookList list)
        {
            return Ok(await _repository.UpdateList(list));
        }
        [HttpDelete("{username}")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteList(string username)
        {
            await _repository.DeleteList(username);
            return Ok();
        }

    }
}
