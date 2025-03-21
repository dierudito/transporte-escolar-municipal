using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace DM.TransporteEscolar.bff.Endpoints.Users;

public class UpdateUserEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapPut("/{idUser:guid}", HandleAsync)
        .WithName("User: Update")
        .WithSummary("Updates a user")
        .WithDescription("Updates a user")
        .WithOrder(2)
        .Produces<Response<UserResponseViewModel>>();

    private static async Task<IResult> HandleAsync(
        IUserAppService appService,
        [FromRoute] Guid idUser,
        [FromBody] UpdateUserRequestViewModel request)
    {
        var response = await appService.UpdateAsync(request, idUser);
        return ResponseResult<bool>.CreateResponse(response);
    }
}
