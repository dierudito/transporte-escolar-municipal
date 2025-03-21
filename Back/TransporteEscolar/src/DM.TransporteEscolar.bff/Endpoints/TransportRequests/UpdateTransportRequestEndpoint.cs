using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.TransportRequests;

public class UpdateTransportRequestEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapPut("/{id:guid}", HandleAsync)
        .WithName("Transport request: Update")
        .WithSummary("Updates a transport request")
        .WithDescription("Updates a transport request")
        .WithOrder(2)
        .Produces<Response<bool>>();

    private static async Task<IResult> HandleAsync(ITransportRequestAppService appService, UpdateTransportRequestRequestViewModel request, Guid id)
    {
        var response = await appService.UpdateAsync(request, id);
        return ResponseResult<bool>.CreateResponse(response);
    }
}
