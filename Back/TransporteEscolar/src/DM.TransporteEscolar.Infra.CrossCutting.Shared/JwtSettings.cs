namespace DM.TransporteEscolar.Infra.CrossCutting.Shared;
public class JwtSettings
{
    public string SecretKey { get; set; } = string.Empty;
    public int TokenExpirationMinutes { get; set; }
}