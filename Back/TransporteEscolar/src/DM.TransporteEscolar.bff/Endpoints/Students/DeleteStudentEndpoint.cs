using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Students;

public class DeleteStudentEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapDelete("/{id}", HandleAsync)
        .WithName("Student: Delete")
        .WithSummary("Deletes a student")
        .WithDescription("Deletes a student")
        .WithOrder(3)
        .Produces<Response<bool>>();

    private static async Task<IResult> HandleAsync(IStudentAppService appService, Guid id)
    {
        var response = await appService.DeleteAsync(id);
        return ResponseResult<bool>.CreateResponse(response);
    }
}
