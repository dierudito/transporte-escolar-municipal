using AutoMapper;
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
        });

        var mapper = mapConfig.CreateMapper();
        return services.AddSingleton(mapper);
    }
}
