using AutoMapper;
using DM.TransporteEscolar.Application.AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace DM.TransporteEscolar.Infra.CrossCutting.IoC.Configurations;
public static class AutoMapperConfig
{
    public static IServiceCollection AddAutoMapper(this IServiceCollection services)
    {
        var mapConfig = new MapperConfiguration(mc =>
        {
            mc.AllowNullDestinationValues = true;
            mc.AllowNullCollections = true;

            mc.AddProfile(new UserMap());
            mc.AddProfile(new SchoolMap());
            mc.AddProfile(new StudentMap());
            mc.AddProfile(new TransportRequestMap());
        });

        var mapper = mapConfig.CreateMapper();
        return services.AddSingleton(mapper);
    }
}
