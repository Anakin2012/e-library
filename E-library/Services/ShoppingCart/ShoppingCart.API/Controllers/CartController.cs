using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingCart.API.Entities;
using ShoppingCart.API.Repositories;
using System;
using System.Threading.Tasks;

namespace ShoppingCart.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CartController: ControllerBase 
    {
        private readonly ICartRepo _repository;

        public CartController(ICartRepo repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        [HttpGet("{username}")]
        [ProducesResponseType(typeof(Cart), StatusCodes.Status200OK)]
        public async Task<ActionResult<Cart>> GetBasket(string username)
        {
            var cart = await _repository.GetCart(username);
            return Ok(cart ?? new Cart(username));
        }
        [HttpPut]
        [ProducesResponseType(typeof(Cart), StatusCodes.Status200OK)]
        public async Task<ActionResult<Cart>> UpdateCart([FromBody] Cart cart)
        {
            return Ok(await _repository.UpdateCart(cart));
        }

        [HttpDelete("username")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteCart(string username)
        {
            await _repository.DeleteCart(username);
            return Ok();
        }
    }
}
