﻿using Catalog.Grpc.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WishList.API.GrpcServices
{
    public class CatalogGrpcService
    {
        private readonly CatalogProtoService.CatalogProtoServiceClient _catalogProtoServiceClient;

        public CatalogGrpcService(CatalogProtoService.CatalogProtoServiceClient catalogProtoServiceClient)
        {
            _catalogProtoServiceClient = catalogProtoServiceClient ?? throw new ArgumentNullException(nameof(catalogProtoServiceClient));
        }

        public async Task<GetBooksResponse> GetBooksByAuthor(string author)
        {

            var getBooksRequest = new GetBooksRequest();

            getBooksRequest.Author = author;


            return await _catalogProtoServiceClient.GetBooksByAuthorAsync(getBooksRequest);
        }

        public async Task<GetBooksByGenreResponse> GetBooksByGenre(string genre)
        {

            var getBooksRequest = new GetBooksByGenreRequest();

            getBooksRequest.Genre = genre;


            return await _catalogProtoServiceClient.GetBooksByGenreAsync(getBooksRequest);
        }

        public async Task<GetBookByIdResponse> GetBookById(string id)
        {

            var getBookRequest = new GetBookByIdRequest();

            getBookRequest.Id = id;


            return await _catalogProtoServiceClient.GetBookByIdAsync(getBookRequest);
        }
    }
}
