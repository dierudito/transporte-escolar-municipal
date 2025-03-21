using DM.TransporteEscolar.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DM.TransporteEscolar.Infra.CrossCutting.IoC.Configurations;
public static class DatabaseConfig
{
    private static IServiceCollection AddEntityFrameworkConfiguration(this IServiceCollection services) =>
    services
        .AddDbContext<TransporteEscolarDbContext>(options =>
        {
            // Use UseNpgsql ao invés de UseSqlServer
            options.UseNpgsql(ApiConfigurations.ConncetionString);
#if (DEBUG)
            options.EnableSensitiveDataLogging();
#endif
        });
}