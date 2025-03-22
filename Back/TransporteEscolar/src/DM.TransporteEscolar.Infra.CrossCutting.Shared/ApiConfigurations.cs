using System.Net;

namespace DM.TransporteEscolar.Infra.CrossCutting.Shared.Configurations;
public class ApiConfigurations
{
    public const HttpStatusCode DefaultStatusCode = HttpStatusCode.OK;
    public static string ConncetionString { get; set; } = string.Empty;
    public static string CorsPolicyName { get; set; } = string.Empty;
    public const int DefaultPageNumber = 1;
    public const int DefaultPageSize = 25;
    public static string BackendUrl { get; set; } = string.Empty;
    public static string FrontendUrl { get; set; } = string.Empty;
    public const string RouterUser = "users";
    public const string RouterStudent = "students";
    public const string RouterSchool = "schools";
    public const string RouterTransportRequest = "transport-requests";
    public const string RouterAuth = "auth";
}
