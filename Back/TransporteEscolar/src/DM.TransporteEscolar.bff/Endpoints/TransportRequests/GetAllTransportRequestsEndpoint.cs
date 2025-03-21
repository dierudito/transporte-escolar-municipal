using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.TransportRequests;

public class GetAllTransportRequestsEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapGet("/", HandleAsync)
        .WithName("Transport request: Get all")
        .WithSummary("Gets all transport requests")
        .WithDescription("Gets all transport requests")
        .WithOrder(5)
        .Produces<Response<List<TransportRequestResponseViewModel>>>();

    private static async Task<IResult> HandleAsync(ITransportRequestAppService appService)
    {
        var response = await appService.GetAllAsync();
        return ResponseResult<List<TransportRequestResponseViewModel>>.CreateResponse(response);
    }
}