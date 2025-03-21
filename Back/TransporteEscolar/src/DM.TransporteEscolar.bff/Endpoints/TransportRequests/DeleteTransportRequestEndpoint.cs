using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.TransportRequests;

public class DeleteTransportRequestEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapDelete("/{id:guid}", HandleAsync)
        .WithName("Transport request: Delete")
        .WithSummary("Deletes a transport request")
        .WithDescription("Deletes a transport request")
        .WithOrder(3)
        .Produces<Response<bool>>();

    private static async Task<IResult> HandleAsync(ITransportRequestAppService appService, Guid id)
    {
        var response = await appService.DeleteAsync(id);
        return ResponseResult<bool>.CreateResponse(response);
    }
}
