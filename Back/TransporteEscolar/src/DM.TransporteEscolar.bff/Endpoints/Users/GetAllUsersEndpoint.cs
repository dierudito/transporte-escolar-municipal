using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Users;

public class GetAllUsersEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapGet("/", HandleAsync)
        .WithName("User: Get all")
        .WithSummary("Get all users")
        .WithDescription("Get all users")
        .WithOrder(5)
        .Produces<Response<List<UserResponseViewModel>>>();

    private static async Task<IResult> HandleAsync(IUserAppService appService)
    {
        var response = await appService.GetAllAsync();
        return ResponseResult<List<UserResponseViewModel>>.CreateResponse(response);
    }
}