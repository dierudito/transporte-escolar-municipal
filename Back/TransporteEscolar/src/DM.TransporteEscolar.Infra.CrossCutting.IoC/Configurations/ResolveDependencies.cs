﻿using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;
using DM.TransporteEscolar.Domain.Services;
using DM.TransporteEscolar.Infra.Data.Repository;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;

namespace DM.TransporteEscolar.Infra.CrossCutting.IoC.Configurations;
public static class AppServiceCollectionExtensions
{
    public static IServiceCollection ResolveDependencies(this IServiceCollection services) =>
        services
        .AddApplicationBase()
        .AddAutoMapper()
        .AddLoggerFactory()
        .AddRepositories()
        .AddServices();

    private static IServiceCollection AddApplicationBase(this IServiceCollection services) =>
        services;

    private static IServiceCollection AddLoggerFactory(this IServiceCollection services)
    {
        services.AddLogging(builder =>
        {
            builder.ClearProviders();

            builder.AddConsole();

            builder.AddFilter<ConsoleLoggerProvider>("", LogLevel.Information);
        });

        return services;
    }

    private static IServiceCollection AddRepositories(this IServiceCollection services) =>
        services
            .AddScoped<IUserRepository, UserRepository>()
            .AddScoped<IStudentRepository, StudentRepository>()
            .AddScoped<ISchoolRepository, SchoolRepository>()
            .AddScoped<ITransportRequestRepository, TransportRequestRepository>();

    private static IServiceCollection AddServices(this IServiceCollection services) =>
        services
            .AddScoped<IUserService, UserService>()
            .AddScoped<IStudentService, StudentService>()
            .AddScoped<ISchoolService, SchoolService>()
            .AddScoped<ITransportRequestService, TransportRequestService>();
}
