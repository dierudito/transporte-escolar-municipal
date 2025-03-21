﻿using DM.TransporteEscolar.Infra.CrossCutting.IoC.Configurations;

namespace DM.TransporteEscolar.bff.Extensions;

public static class ServiceCollectionExtension
{
    internal static IServiceCollection RegisterServices(this IServiceCollection services) =>
        services
        .AddDatabaseConfiguration()
        .AddCrossOrigin()
        .AddDocumentation()
        .ResolveDependencies()
        .AddAppServices();

    private static IServiceCollection AddAppServices(this IServiceCollection services) =>
        services;

    public static IServiceCollection AddDocumentation(this IServiceCollection services) =>
        services
        .AddEndpointsApiExplorer()
        .AddSwaggerGen(x =>
        {
            x.CustomSchemaIds(n => n.FullName);
        });

    public static IServiceCollection AddCrossOrigin(this IServiceCollection services) =>
        services.AddCors(
            options => options.AddPolicy(
                ApiConfigurations.CorsPolicyName,
            policy => policy
                .WithOrigins([
                    ApiConfigurations.BackendUrl,
                    ApiConfigurations.FrontendUrl
                    ])
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                ));
}