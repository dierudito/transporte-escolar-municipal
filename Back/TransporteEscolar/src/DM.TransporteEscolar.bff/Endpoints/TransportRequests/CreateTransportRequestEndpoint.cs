using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.TransportRequests;

public class CreateTransportRequestEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapPost("/", HandleAsync)
        .WithName("Transport request: Create")
        .WithSummary("Creates a new transport request")
        .WithDescription("Creates a new transport request")
        .WithOrder(1)
        .Produces<Response<TransportRequestResponseViewModel>>();

    private static async Task<IResult> HandleAsync(ITransportRequestAppService appService, AddTransportRequestRequestViewModel request)
    {
        var response = await appService.AddAsync(request);
        return ResponseResult<TransportRequestResponseViewModel>.CreateResponse(response);
    }
}