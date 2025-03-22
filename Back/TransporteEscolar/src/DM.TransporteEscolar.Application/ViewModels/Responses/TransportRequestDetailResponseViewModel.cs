namespace DM.TransporteEscolar.Application.ViewModels.Responses;
public class TransportRequestDetailResponseViewModel
{
    public Guid? Id { get; set; }
    public string? StatusRequest { get; set; }
    public string? StudentName { get; set; }
    public string? SchoolName { get; set; }
    public DateTime RequestDate { get; set; }
}