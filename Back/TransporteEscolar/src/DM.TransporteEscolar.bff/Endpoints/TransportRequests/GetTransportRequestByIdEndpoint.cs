using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.TransportRequests;

public class GetTransportRequestByIdEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapGet("/{id:guid}", HandleAsync)
        .WithName("Transport request: Get by id")
        .WithSummary("Gets a transport request by id")
        .WithDescription("Gets a transport request by id")
        .WithOrder(4)
        .Produces<Response<TransportRequestResponseViewModel>>();

    private static async Task<IResult> HandleAsync(ITransportRequestAppService appService, Guid id)
    {
        var response = await appService.GetByIdAsync(id);
        return ResponseResult<TransportRequestResponseViewModel>.CreateResponse(response);
    }
}
