using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Students;

public class CreateStudentEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapPost("/", HandleAsync)
        .WithName("Student: Create")
        .WithSummary("Creates a new student")
        .WithDescription("Creates a new student")
        .WithOrder(1)
        .Produces<Response<StudentResponseViewModel>>();

    private static async Task<IResult> HandleAsync(IStudentAppService appService, AddStudentRequestViewModel request)
    {
        var response = await appService.AddAsync(request);
        return ResponseResult<StudentResponseViewModel>.CreateResponse(response);
    }
}