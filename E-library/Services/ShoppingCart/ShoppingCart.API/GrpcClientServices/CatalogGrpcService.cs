using Catalog.Grpc.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingCart.API.GrpcClientServices
{
    public class CatalogGrpcService
    {
        private readonly CatalogProtoService.CatalogProtoServiceClient _catalogProtoServiceClient;

        public CatalogGrpcService(CatalogProtoService.CatalogProtoServiceClient catalogProtoServiceClient)
        {
            _catalogProtoServiceClient = catalogProtoServiceClient ?? throw new ArgumentNullException(nameof(catalogProtoServiceClient));
        }

        public async Task<GetBookByIdResponse> GetBookById(string id)
        {
            var getBookRequest = new GetBookByIdRequest();
            getBookRequest.Id = id;

            return await _catalogProtoServiceClient.GetBookByIdAsync(getBookRequest);
        }

    }
}
