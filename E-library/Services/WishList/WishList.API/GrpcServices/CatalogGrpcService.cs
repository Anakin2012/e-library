using Catalog.Grpc.Services;
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

        public async Task<GetBooksResponse> GetBooksByAuthor(string author) {

            var getBooksRequest = new GetBooksRequest();

            getBooksRequest.Author = author;


            return await _catalogProtoServiceClient.GetBooksByAuthorAsync(getBooksRequest);
        }
    }
}
