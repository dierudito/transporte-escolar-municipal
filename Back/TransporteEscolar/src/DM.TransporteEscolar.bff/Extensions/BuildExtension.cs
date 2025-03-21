﻿namespace DM.TransporteEscolar.bff.Extensions;

public static class BuildExtension
{
    public static void AddConfiguration(this WebApplicationBuilder builder)
    {
        ApiConfigurations.ConncetionString =
            builder.Configuration.GetConnectionString("CashFlowControlDbSqlServer") ?? string.Empty;
        ApiConfigurations.BackendUrl =
            builder.Configuration.GetValue<string>("BackendUrl") ?? string.Empty;
    }
}
