using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Users;

public class DeleteUserEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapDelete("/{idUser:guid}", HandleAsync)
        .WithName("User: Delete")
        .WithSummary("Deletes a user")
        .WithDescription("Deletes a user")
        .WithOrder(3)
        .Produces<Response<bool>>();

    private static async Task<IResult> HandleAsync(IUserAppService appService, Guid idUser)
    {
        var response = await appService.DeleteAsync(idUser);
        return ResponseResult<bool>.CreateResponse(response);
    }
}
