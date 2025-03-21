using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Students;

public class UpdateStudentEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapPut("/{id:guid}", HandleAsync)
        .WithName("Student: Update")
        .WithSummary("Updates a student")
        .WithDescription("Updates a student")
        .WithOrder(2)
        .Produces<Response<bool>>();

    private static async Task<IResult> HandleAsync(IStudentAppService appService, Guid id, UpdateStudentRequestViewModel request)
    {
        var response = await appService.UpdateAsync(request, id);
        return ResponseResult<bool>.CreateResponse(response);
    }
}
