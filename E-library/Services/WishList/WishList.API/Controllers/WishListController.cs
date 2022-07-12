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
        private readonly WishListRepository _repository;
        private readonly WishListService _service;

        public WishListController(WishListRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }
        [HttpGet("{username}")]
        [ProducesResponseType(typeof(WishBookList), StatusCodes.Status200OK)]
        public async Task<ActionResult<WishBookList>> GetList(string username) { 
            var basket = await _repository.GetList(username);
            return Ok(basket ?? new WishBookList(username));
        }

        [HttpGet("recommend/{username}")]
        [ProducesResponseType(typeof(WishBookList), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ListItem>>> GetRecommendations(string username)
        {
            var recommendations = _service.getRecommendations(username);
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
