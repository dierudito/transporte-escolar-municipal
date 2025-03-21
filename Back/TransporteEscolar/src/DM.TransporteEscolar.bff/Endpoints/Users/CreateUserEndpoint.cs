using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Users;

public class CreateUserEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapPost("/", HandleAsync)
        .WithName("User: Create")
        .WithSummary("Creates a new user")
        .WithDescription("Creates a new user")
        .WithOrder(1)
        .Produces<Response<UserResponseViewModel>>();


    private static async Task<IResult> HandleAsync(IUserAppService appService, AddUserRequestViewModel request)
    {
        var response = await appService.AddAsync(request);
        return ResponseResult<UserResponseViewModel>.CreateResponse(response);
    }
}