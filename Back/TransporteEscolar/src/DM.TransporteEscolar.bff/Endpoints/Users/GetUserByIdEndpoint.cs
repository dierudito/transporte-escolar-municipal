using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Users;

public class GetUserByIdEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapGet("/{idUser:guid}", HandleAsync)
        .WithName("User: Get by Id")
        .WithSummary("Get user by id")
        .WithDescription("Get user by id")
        .WithOrder(4)
        .Produces<Response<UserResponseViewModel>>();

    private static async Task<IResult> HandleAsync(IUserAppService appService, Guid idUser)
    {
        var response = await appService.GetByIdAsync(idUser);
        return ResponseResult<UserResponseViewModel>.CreateResponse(response);
    }
}
