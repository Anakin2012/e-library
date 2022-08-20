
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using EventBus.Messages.Events;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingCart.API.Entities;
using ShoppingCart.API.Repositories;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using ShoppingCart.API.GrpcClientServices;
using ShoppingCart.API.Services;
using System.Collections.Generic;

namespace ShoppingCart.API.Controllers
{
    //[Authorize(Roles = "Member, PremiumMember")]
    [Authorize(Roles = "Member, PremiumMember")]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _service;
        private readonly ICartRepo _repository;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public CartController(ICartService service, ICartRepo repository, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _publishEndpoint = publishEndpoint ?? throw new ArgumentNullException(nameof(publishEndpoint));
        }

        [Route("[action]/{username}")]
        [HttpGet]
        [ProducesResponseType(typeof(Cart), StatusCodes.Status200OK)]
        public async Task<ActionResult<Cart>> GetCart(string username)
        {
            //if (User.FindFirst(ClaimTypes.Name).Value != username)
            //{
            //    return Forbid();
            //}
            /*
            if (User.FindFirst(ClaimTypes.Name).Value != username)
            {
                return Forbid();
            }
*/
            var cart = await _repository.GetCart(username);
            return Ok(cart ?? new Cart(username));
        }

        [Route("[action]")]
        [HttpPut]
        [ProducesResponseType(typeof(Cart), StatusCodes.Status200OK)]
        public async Task<ActionResult<Cart>> UpdateCart([FromBody] Cart cart)
        {
            ///if (User.FindFirst(ClaimTypes.Name).Value != cart.Username)
            //{
            //    return Forbid();
            //}

            /*
            if (User.FindFirst(ClaimTypes.Name).Value != cart.Username)
            {
                return Forbid();
            }
*/
            return Ok(await _repository.UpdateCart(cart));
        }

        [Route("[action]/{username}")]
        [HttpDelete]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteCart(string username)
        {
            //if (User.FindFirst(ClaimTypes.Name).Value != username)
            //{
            //    return Forbid();
            //}
            /*
            if (User.FindFirst(ClaimTypes.Name).Value != username)
            {
                return Forbid();
            }
            */
            await _repository.DeleteCart(username);
            return Ok();
        }

        [Route("[action]/{username}")]
        [HttpPost]
        [ProducesResponseType(typeof(void), StatusCodes.Status202Accepted)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Checkout(string username,[FromBody] CheckoutOrderDetails checkoutOrderDetails)
        {
            //if (User.FindFirst(ClaimTypes.Name).Value != username)
           // {
           //     return Forbid();
           // }
            /*
            if(User.FindFirst(ClaimTypes.Name).Value != username)
            {
                return Forbid();
            }

            */
            List<Entities.CartItem> checkoutItems = new List<Entities.CartItem>();
            
            var cart = await _repository.GetCart(username);
            if (cart == null)
            {
                return BadRequest("There is no active shopping cart for this user");
            }

            var eventMessage = _mapper.Map<CartCheckoutEvent>(cart);
            eventMessage.City = checkoutOrderDetails.City;
            eventMessage.Country = checkoutOrderDetails.Country;
            eventMessage.EmailAddress = checkoutOrderDetails.EmailAddress;
            eventMessage.State = checkoutOrderDetails.State;
            eventMessage.Street = checkoutOrderDetails.Street;
            eventMessage.ZipCode = checkoutOrderDetails.ZipCode;
            await _publishEndpoint.Publish(eventMessage);

            cart.Items.Clear();
            await _repository.UpdateCart(cart);

            return Accepted();

        }

        [Route("[action]/{username}/{bookId}")]
        [HttpPut]
        [ProducesResponseType(typeof(Cart), StatusCodes.Status200OK)]
        public async Task<ActionResult<Cart>> AddBookToCart(string username, string bookId)
        {
            if (User.FindFirst(ClaimTypes.Name).Value != username)
            {
               return Forbid();
            }

            var result =  await _service.AddBookToCart(username, bookId);
            if (result == null)
            {
                return Forbid();
            }

            var book = result.Find(b =>  b.BookId == bookId);

            if (book.IsPremium) { 
                if (!User.IsInRole("PremiumMember")) {
                    RemoveBookFromCart(username, bookId);
                    return Forbid();
                }
            }
          
            return Ok(result);
        }

        [Route("[action]/{username}/{bookId}")]
        [HttpPut]
        [ProducesResponseType(typeof(Cart), StatusCodes.Status200OK)]
        public async Task<ActionResult<Cart>> RemoveBookFromCart(string username, string bookId)
        {
            //if (User.FindFirst(ClaimTypes.Name).Value != username)
            //{
            //    return Forbid();
            //}
            /*
            if (User.FindFirst(ClaimTypes.Name).Value != username)
            {
                return Forbid();
            }
        */
            return Ok(await _service.RemoveBookFromCart(username, bookId));
        }

    }
}
