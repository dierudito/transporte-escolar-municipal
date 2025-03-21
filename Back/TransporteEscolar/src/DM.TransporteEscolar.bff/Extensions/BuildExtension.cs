using DM.TransporteEscolar.Infra.CrossCutting.IoC.Configurations;

namespace DM.TransporteEscolar.bff.Extensions;

public static class BuildExtension
{
    public static void AddConfiguration(this WebApplicationBuilder builder)
    {
        ApiConfigurations.ConncetionString =
            builder.Configuration.GetConnectionString("TransporteEscolarDbPostgres") ?? string.Empty;
        ApiConfigurations.BackendUrl =
            builder.Configuration.GetValue<string>("BackendUrl") ?? string.Empty;
    }
}
