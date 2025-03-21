using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Schools;

public class DeleteSchoolEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapDelete("/{idSchool:guid}", HandleAsync)
        .WithName("School: Delete")
        .WithSummary("Deletes a school")
        .WithDescription("Deletes a school")
        .WithOrder(3)
        .Produces<Response<bool>>();

    private static async Task<IResult> HandleAsync(ISchoolAppService appService, Guid idSchool)
    {
        var response = await appService.DeleteAsync(idSchool);
        return ResponseResult<bool>.CreateResponse(response);
    }
}
