
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
    [Authorize(Roles = "Member")]
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

            var cart = await _repository.GetCart(username);
            return Ok(cart ?? new Cart(username));
        }

        [Route("[action]")]
        [HttpPut]
        [ProducesResponseType(typeof(Cart), StatusCodes.Status200OK)]
        public async Task<ActionResult<Cart>> UpdateCart([FromBody] Cart cart)
        {
            //if (User.FindFirst(ClaimTypes.Name).Value != cart.Username)
            //{
            //    return Forbid();
            //}

            return Ok(await _repository.UpdateCart(cart));
        }

        [Route("[action]/{username}")]
        [HttpDelete]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteCart(string username)
        {
            //if (User.FindFirst(ClaimTypes.Name).Value != username)
           // {
           //     return Forbid();
            //}

            await _repository.DeleteCart(username);
            return Ok();
        }

        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType(typeof(void), StatusCodes.Status202Accepted)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Checkout(string username)
        {
            //if (User.FindFirst(ClaimTypes.Name).Value != cartCheckout.Username)
            //{
            //    return Forbid();
            //}

            CartCheckout cartCheckout = new CartCheckout();
            List<Entities.CartItem> checkoutItems = new List<Entities.CartItem>();
            var cart = await _repository.GetCart(username);
            if (cart == null)
            {
                return BadRequest("There is no active shopping cart for this user");
            }

            cartCheckout.Username = username;
           
            cartCheckout.MemberId = null;
            foreach (var item in cart.Items) {
                Entities.CartItem checkoutItem = new Entities.CartItem();
                checkoutItem.BookAuthor = item.BookAuthor;
                checkoutItem.BookGenre = item.BookGenre;
                checkoutItem.BookId = item.BookId;
                checkoutItem.BookTitle = item.BookTitle;
                checkoutItem.CoverImageFile = item.CoverImageFile;
                checkoutItem.IsPremium = item.IsPremium;
                checkoutItem.Language = item.Language;
                checkoutItems.Add(checkoutItem);
            }
            cartCheckout.OrderItems = checkoutItems;

            var eventMessage = _mapper.Map<CartCheckoutEvent>(cartCheckout);
            await _publishEndpoint.Publish(eventMessage);

            await _repository.DeleteCart(cartCheckout.Username);

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
/*
            if (book.IsPremium)
            
                if (!User.IsInRole("PremiumMember"))
                
                    return Forbid();
                }
            }
*/
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

            return Ok(await _service.RemoveBookFromCart(username, bookId));
        }

    }
}
