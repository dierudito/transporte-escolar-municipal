using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Schools;

public class UpdateSchoolEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapPut("/{idSchool:guid}", HandleAsync)
        .WithName("School: Update")
        .WithSummary("Updates a school")
        .WithDescription("Updates a school")
        .WithOrder(2)
        .Produces<Response<bool>>();

    private static async Task<IResult> HandleAsync(ISchoolAppService appService, Guid idSchool, UpdateSchoolRequestViewModel request)
    {
        var response = await appService.UpdateAsync(request, idSchool);
        return ResponseResult<bool>.CreateResponse(response);
    }
}
