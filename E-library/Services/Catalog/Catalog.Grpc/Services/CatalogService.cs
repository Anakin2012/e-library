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

        public CatalogService(IBookRepository repository, IMapper mapper, ILogger<CatalogService> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
        }

        public override async Task<GetBooksResponse> GetBooksByAuthor(GetBooksRequest request, ServerCallContext context)
        {

            var books = await _repository.GetBooksByAuthor(request.Author);

            var response = new GetBooksResponse();


            response.Books.AddRange(_mapper.Map<IEnumerable<GetBooksResponse.Types.Book>>(books));

            _logger.LogInformation("Books successfully retrieved from catalog");

            return response;
        }

        public override async Task<GetBooksByGenreResponse> GetBooksByGenre(GetBooksByGenreRequest request, ServerCallContext context)
        {

            var books = await _repository.GetBooksByGenre(request.Genre);

            var response = new GetBooksByGenreResponse();


            response.Books.AddRange(_mapper.Map<IEnumerable<GetBooksByGenreResponse.Types.Book>>(books));

            _logger.LogInformation("Books successfully retrieved from catalog");

            return response;
        }

        public override async Task<GetBookByIdResponse> GetBookById(GetBookByIdRequest request, ServerCallContext context)
        {

            var book = await _repository.GetBook(request.Id);

            var response = new GetBookByIdResponse();


            response.Book = _mapper.Map<GetBookByIdResponse.Types.Book>(book);

            _logger.LogInformation("Book with id " + book.Id + " successfully retrieved from catalog");

            return response;
        }

    }
}
