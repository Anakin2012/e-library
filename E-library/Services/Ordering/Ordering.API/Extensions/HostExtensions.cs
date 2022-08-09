using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using Polly;
using Microsoft.Data.SqlClient;

namespace Ordering.API.Extensions
{
    public static class HostExtensions
    {
        public static IHost MigrateDatabase<TContext>(this IHost host, Action<TContext,IServiceProvider> seeder) where TContext : DbContext
        {
            using(var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<TContext>>();
                var context = services.GetService<TContext>();

                try
                {
                    logger.LogInformation("Migrating database associated with context {DbContextName}", typeof(TContext).Name);
                    var retry = Policy.Handle<SqlException>()
                        .WaitAndRetry(
                        retryCount : 5,
                        sleepDurationProvider : retryAttempt => TimeSpan.FromSeconds(3*retryAttempt),
                        onRetry: (exception, retryCount, context) => {
                        logger.LogError($"Retry {retryCount} if {context.PolicyKey} at {context.OperationKey}, due to {exception}.");
                    });

                    retry.Execute(() => Invoke(context, seeder, services));
                    logger.LogInformation("Migrating database associated with context {DbContextName} was succesful", typeof(TContext).Name);

                }
                catch (SqlException ex)
                {
                    logger.LogError(ex, "An error occured while migrating database used on context {DbContext}", typeof(TContext).Name);
                }
            }
            return host;
        }

        private static void Invoke<TContext>(TContext context, Action<TContext, IServiceProvider> seeder, IServiceProvider services) where TContext : DbContext
        {
            context.Database.Migrate();
            seeder(context, services);
        }
    }
}
