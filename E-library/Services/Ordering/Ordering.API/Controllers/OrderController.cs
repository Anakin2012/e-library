﻿using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ordering.Application.Cqrs.Orders.Commands.CreateOrderCommand;
using Ordering.Application.Cqrs.Orders.Queries.DTOs;
using Ordering.Application.Cqrs.Orders.Queries.GetOrders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Ordering.API.Controllers
{
    //[Authorize(Roles = "Administrator")]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrderController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [Route("[action]/{username}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<OrderDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrdersByUsername(string username)
        {
            var query = new GetOrdersQuery(username);
            var orders = await _mediator.Send(query);
            return Ok(orders);
        }

        [Route("[action]")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<OrderDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetAllOrders()
        {
            var query = new GetAllOrdersQuery();
            var orders = await _mediator.Send(query);
            return Ok(orders);
        }

        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<ActionResult<int>> CheckoutOrder(CreateOrderCommand command)
        {
            if (User.FindFirstValue(ClaimTypes.Expired) == "True")
            {
                return Forbid();
            }
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
