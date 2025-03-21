using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Students;

public class GetAllStudentsEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapGet("/", HandleAsync)
        .WithName("Student: Get All")
        .WithSummary("Get all students")
        .WithDescription("Get all students")
        .WithOrder(5)
        .Produces<Response<List<StudentResponseViewModel>>>();

    private static async Task<IResult> HandleAsync(IStudentAppService appService)
    {
        var response = await appService.GetAllAsync();
        return ResponseResult<List<StudentResponseViewModel>>.CreateResponse(response);
    }
}