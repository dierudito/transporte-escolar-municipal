using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;
using DM.TransporteEscolar.Infra.CrossCutting.Shared.Configurations;
using Microsoft.AspNetCore.Mvc;

namespace DM.TransporteEscolar.bff.Endpoints.TransportRequests;

public class GetDetailTransportRequestsPagesEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapGet("/list-detail", HandleAsync)
        .WithName("Transport request: Paged detailed")
        .WithSummary("Detailed transport request list paginated")
        .WithDescription("Detailed transport request list paginated")
        .Produces<Response<PagedResponseViewModel<TransportRequestDetailResponseViewModel>>>();

    private static async Task<IResult> HandleAsync(ITransportRequestAppService service,
        [FromQuery] int pageNumber = ApiConfigurations.DefaultPageNumber, 
        [FromQuery] int pageSize = ApiConfigurations.DefaultPageSize)
    {
        var request = new GetTransportRequetsDetailRequestViewModel(pageNumber, pageSize);
        var response = await service.GetPagedDetailAsync(request);
        return ResponseResult<PagedResponseViewModel<TransportRequestDetailResponseViewModel>>
            .CreateResponse(response);
    }
}
