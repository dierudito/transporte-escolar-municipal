using DM.TransporteEscolar.bff.Endpoints.Schools;
using DM.TransporteEscolar.bff.Endpoints.Students;
using DM.TransporteEscolar.bff.Endpoints.TransportRequests;
using DM.TransporteEscolar.bff.Endpoints.Users;
using DM.TransporteEscolar.bff.Extensions;
using DM.TransporteEscolar.Infra.CrossCutting.Shared.Configurations;

namespace DM.TransporteEscolar.bff.Endpoints;

public static class Endpoint
{
    public static void MapEndpoints(this WebApplication app)
    {
        var endpoints = app.MapGroup("");

        endpoints.MapGroup("/")
            .WithTags("Health Check")
            .MapGet("/", () => new { message = "OK" });

        endpoints.MapGroup($"v1/{ApiConfigurations.RouterSchool}")
            .WithTags("Schools")
            .MapEndpoint<CreateSchoolEndpoint>()
            .MapEndpoint<UpdateSchoolEndpoint>()
            .MapEndpoint<DeleteSchoolEndpoint>()
            .MapEndpoint<GetAllSchoolsEndpoint>()
            .MapEndpoint<GetSchoolByIdEndpoint>();

        endpoints.MapGroup($"v1/{ApiConfigurations.RouterStudent}")
            .WithTags("Students")
            .MapEndpoint<CreateStudentEndpoint>()
            .MapEndpoint<UpdateStudentEndpoint>()
            .MapEndpoint<DeleteStudentEndpoint>()
            .MapEndpoint<GetAllStudentsEndpoint>()
            .MapEndpoint<GetStudentByIdEndpoint>();

        endpoints.MapGroup($"v1/{ApiConfigurations.RouterTransportRequest}")
            .WithTags("Transport Requests")
            .MapEndpoint<CreateTransportRequestEndpoint>()
            .MapEndpoint<UpdateTransportRequestEndpoint>()
            .MapEndpoint<DeleteTransportRequestEndpoint>()
            .MapEndpoint<GetAllTransportRequestsEndpoint>()
            .MapEndpoint<GetTransportRequestByIdEndpoint>();

        endpoints.MapGroup($"v1/{ApiConfigurations.RouterUser}")
            .WithTags("Users")
            .MapEndpoint<CreateUserEndpoint>()
            .MapEndpoint<UpdateUserEndpoint>()
            .MapEndpoint<DeleteUserEndpoint>()
            .MapEndpoint<GetAllUsersEndpoint>()
            .MapEndpoint<GetUserByIdEndpoint>();
    }

    private static IEndpointRouteBuilder MapEndpoint<TEndpoint>(this IEndpointRouteBuilder app)
        where TEndpoint : IEndpoint
    {
        TEndpoint.Map(app);
        return app;
    }
}