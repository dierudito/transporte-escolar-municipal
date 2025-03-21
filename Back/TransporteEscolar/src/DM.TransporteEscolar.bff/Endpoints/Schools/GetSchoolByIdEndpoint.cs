using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Schools;

public class GetSchoolByIdEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapGet("/{idSchool:guid}", HandleAsync)
        .WithName("School: Get by Id")
        .WithSummary("Get a school by Id")
        .WithDescription("Get a school by Id")
        .WithOrder(4)
        .Produces<Response<SchoolResponseViewModel>>();

    private static async Task<IResult> HandleAsync(ISchoolAppService appService, Guid idSchool)
    {
        var response = await appService.GetByIdAsync(idSchool);
        return ResponseResult<SchoolResponseViewModel>.CreateResponse(response);
    }
}
