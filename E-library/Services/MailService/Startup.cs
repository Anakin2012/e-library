using EventBus.Messages.Constants;
using MailService.EventBusConsumers;
using MailService.Models;
using MailService.SendingMailsService;
using MassTransit;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace MailService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            services.Configure<MailSettings>(c =>
            {
                c.EmailAddress = Configuration["MailSettings:EmailAddress"];
                c.DisplayName = Configuration["MailSettings:DisplayName"];
                c.Password = Configuration["MailSettings:Password"];
                c.Host = Configuration["MailSettings:Host"];
                c.Port = int.Parse(Configuration["MailSettings:Port"]);
            });

            services.AddScoped<ISendingMails, SendingMails>();

            services.AddMassTransit(config => {
                config.AddConsumer<MembershipExpiringConsumer>();
                config.AddConsumer<PayingConsumer>();
                config.AddConsumer<DeletingAccountConsumer>();
                config.AddConsumer<ChangePasswordConsumer>();
                config.UsingRabbitMq((ctx, cfg) => {
                    cfg.Host(Configuration["EventBusSettings:HostAddress"]);
                    cfg.ReceiveEndpoint(EventBusConstants.MembershipQueue, c => {
                        c.ConfigureConsumer<MembershipExpiringConsumer>(ctx);
                        c.ConfigureConsumer<PayingConsumer>(ctx);
                        c.ConfigureConsumer<DeletingAccountConsumer>(ctx);
                        c.ConfigureConsumer<ChangePasswordConsumer>(ctx);
                    });
                });
            });
            services.AddMassTransitHostedService();

            services.AddAutoMapper(Assembly.GetExecutingAssembly());


            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MailService", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MailService v1"));
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
