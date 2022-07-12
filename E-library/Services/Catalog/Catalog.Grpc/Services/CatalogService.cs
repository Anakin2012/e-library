using AutoMapper;
using Catalog.API.Repositories.Interfaces;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Grpc.Services
{
    public class CatalogService : CatalogProtoService.CatalogProtoServiceBase

    {

        private readonly IBookRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<CatalogService> _logger;
        public override async Task<GetBooksResponse> GetBooks(GetBooksRequest request, ServerCallContext context)
        {

            var books = await _repository.GetBooks();

            var response = new GetBooksResponse();

            response.Books.AddRange(_mapper.Map<IEnumerable<GetBooksResponse.Types.Book>>(books));

            _logger.LogInformation("Books successfully retrieved from catalog");

            return response;
        }

    }
}
