using Catalog.API.Data;
using Catalog.API.DTOs;
using Catalog.API.Entities;
using Catalog.API.Repositories;
using Catalog.API.Repositories.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.API.Extensions
{
    public static  class CatalogExtensions
    {
        public static void AddCatalogServices(this IServiceCollection services) {
            services.AddScoped<ICatalogContext, CatalogContext>();
            services.AddScoped<IBookRepository, BookRepository>();

            services.AddAutoMapper(configuration =>
               {
                   configuration.CreateMap<BookDTO, Book>().ReverseMap();
                   configuration.CreateMap<Book, UpdateBookDTO>().ReverseMap();
 
               });
        }
    }
}
