using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Schools;

public class CreateSchoolEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapPost("/", HandleAsync)
        .WithName("School: Create")
        .WithSummary("Creates a new school")
        .WithDescription("Creates a new school")
        .WithOrder(1)
        .Produces<Response<SchoolResponseViewModel>>();

    private static async Task<IResult> HandleAsync(ISchoolAppService appService, AddSchoolRequestViewModel request)
    {
        var response = await appService.AddAsync(request);
        return ResponseResult<SchoolResponseViewModel>.CreateResponse(response);
    }
}