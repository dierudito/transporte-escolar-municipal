using System.Net;

namespace DM.TransporteEscolar.Infra.CrossCutting.IoC.Configurations;
public class ApiConfigurations
{
    public const HttpStatusCode DefaultStatusCode = HttpStatusCode.OK;
    public static string ConncetionString { get; set; } = string.Empty;
    public static string CorsPolicyName => "corsdodiegomoreno";
    public static string BackendUrl { get; set; } = string.Empty;
    public static string FrontendUrl { get; set; } = string.Empty;
}
