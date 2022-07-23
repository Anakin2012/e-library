using Library.API.Data;
using Library.API.DTOs;
using Library.API.Enitites;
using Library.API.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Extensions
{
    public static class LibraryExtensions
    {
        public static void AddLibraryServices(this IServiceCollection services) {

            services.AddScoped<ILibraryContext, LibraryContext>();
            services.AddScoped<ILibraryRepository, LibraryRepository>();

            services.AddAutoMapper(configuration =>
            {
                configuration.CreateMap<LibraryItemDTO, LibraryItem>().ReverseMap();
            });
        }
    }
}
