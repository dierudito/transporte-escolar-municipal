using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Students;

public class GetStudentByIdEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapGet("/{id}", HandleAsync)
        .WithName("Student: Get by Id")
        .WithSummary("Get a student by Id")
        .WithDescription("Get a student by Id")
        .WithOrder(4)
        .Produces<Response<StudentResponseViewModel>>();

    private static async Task<IResult> HandleAsync(IStudentAppService appService, Guid id)
    {
        var response = await appService.GetByIdAsync(id);
        return ResponseResult<StudentResponseViewModel>.CreateResponse(response);
    }
}
