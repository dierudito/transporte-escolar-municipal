using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.bff.Extensions;

namespace DM.TransporteEscolar.bff.Endpoints.Auth;

public class AuthEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapPost("/", HandleAsync)
        .WithName("Auth")
        .WithOrder(1)
        .Produces<Response<LoginResponseViewModel>>();

    private static async Task<IResult> HandleAsync(IUserAppService appService, LoginRequestViewModel request)
    {
        var response = await appService.LoginAsync(request);
        return ResponseResult<LoginResponseViewModel>.CreateResponse(response);
    }
}
