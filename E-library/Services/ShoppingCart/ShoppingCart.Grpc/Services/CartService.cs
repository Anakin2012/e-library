using AutoMapper;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using ShoppingCart.API.Repositories;
using ShoppingCart.Grpc.Protos;
using System;
using System.Threading.Tasks;

namespace ShoppingCart.Grpc.Services
{
    public class CartService : CartProtoService.CartProtoServiceBase
    {
        private readonly ICartRepo _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<CartService> _logger;

        public CartService(ICartRepo repository, IMapper mapper, ILogger<CartService> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public override async Task<GetCartResponse> GetCart(GetCartRequest request, ServerCallContext context)
        {
            var cart = await _repository.GetCart(request.Username);
            if (cart == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, $"Cart with username: {request.Username} is not found"));
            }

            _logger.LogInformation($"{request.Username}'s cart has been aquired");

            var response = new GetCartResponse();
            response.CartItems.AddRange((System.Collections.Generic.IEnumerable<CartItem>)cart);

            return response;

        }
    }
}
