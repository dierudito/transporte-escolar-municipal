using DM.TransporteEscolar.Infra.CrossCutting.Shared.Configurations;
using DM.TransporteEscolar.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DM.TransporteEscolar.Infra.CrossCutting.IoC.Configurations;
public static class DatabaseConfig
{
    public static IServiceCollection AddDatabaseConfiguration(this IServiceCollection services) =>
        services
        .AddEntityFrameworkConfiguration();

    private static IServiceCollection AddEntityFrameworkConfiguration(this IServiceCollection services) =>
    services
        .AddDbContext<TransporteEscolarDbContext>(options =>
        {
            options.UseNpgsql(ApiConfigurations.ConncetionString);
#if (DEBUG)
            options.EnableSensitiveDataLogging();
#endif
        });
}