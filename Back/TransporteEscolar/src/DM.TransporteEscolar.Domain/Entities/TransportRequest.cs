using DM.TransporteEscolar.Domain.Entities.Base;
using DM.TransporteEscolar.Domain.Enums;

namespace DM.TransporteEscolar.Domain.Entities;

public class TransportRequest : Entity
{
    public Guid StudentId { get; set; }
    public virtual Student Student { get; set; } = null!;
    public Guid SchoolId { get; set; }
    public virtual School School { get; set; } = null!;
    public DateTime Date { get; set; } = DateTime.Now;
    public StatusRequest Status { get; set; }
    public string? AdditionalInfo { get; set; }
}