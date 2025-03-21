using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Schools;

public class GetAllSchoolsEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapGet("/", HandleAsync)
        .WithName("School: Get All")
        .WithSummary("Get all schools")
        .WithDescription("Get all schools")
        .WithOrder(5)
        .Produces<Response<List<SchoolResponseViewModel>>>();

    private static async Task<IResult> HandleAsync(ISchoolAppService appService)
    {
        var response = await appService.GetAllAsync();
        return ResponseResult<List<SchoolResponseViewModel>>.CreateResponse(response);
    }
}