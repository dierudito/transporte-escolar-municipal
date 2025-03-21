using DM.TransporteEscolar.Infra.CrossCutting.Shared.Configurations;

namespace DM.TransporteEscolar.bff.Extensions;

public static class BuildExtension
{
    public static void AddConfiguration(this WebApplicationBuilder builder)
    {
        ApiConfigurations.ConncetionString =
            builder.Configuration.GetConnectionString("TransporteEscolarDbPostgres") ?? string.Empty;
        ApiConfigurations.BackendUrl =
            builder.Configuration.GetValue<string>("Config:Cors:BackendUrl") ?? string.Empty;
        ApiConfigurations.CorsPolicyName =
            builder.Configuration.GetValue<string>("Config:Cors:Name") ?? string.Empty;
    }
}
