﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ordering.Application.Contracts.Factories;
using Ordering.Application.Contracts.Persistence;
using Ordering.Infrastructure.Factories;
using Ordering.Infrastructure.Persistance;
using Ordering.Infrastructure.Repositories;
using Ordering.Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ordering.Application.Contracts.Infrastructure;
using Ordering.Infrastructure.Mail;

namespace Ordering.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<OrderContext>(options => options.UseSqlServer(configuration.GetConnectionString("OrderingConnectionString")));
            services.AddScoped(typeof(IAsyncRepository<>), typeof(RepositoryBase<>));
            services.AddScoped<IOrderRepository,OrderRepository>();
            services.AddScoped<IOrderFactory, OrderFactory>();
            services.AddScoped<IOrderDTOFactory, OrderDTOFactory>();
            services.Configure<EmailConfiguration>(c =>
            {
                var config = configuration.GetSection("EmailConfiguration");
                c.Mail = config["Mail"];
                c.DisplayName = config["DisplayName"];
                c.Password = config["Password"];
                c.Host = config["Host"];
//                c.Port = int.Parse(config["Port"]);
            });

            services.AddTransient<IEmailService, EmailService>();
            return services;
        }
    }
}
