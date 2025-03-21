namespace DM.TransporteEscolar.bff.Extensions;

public interface IEndpoint
{
    static abstract void Map(IEndpointRouteBuilder app);
}