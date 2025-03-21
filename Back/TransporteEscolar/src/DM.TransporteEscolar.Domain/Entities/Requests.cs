using DM.TransporteEscolar.Domain.Entities.Base;
using DM.TransporteEscolar.Domain.Enums;

namespace DM.TransporteEscolar.Domain.Entities;

public class Requests : EntityBase
{
    public Guid StudentId { get; set; }
    public virtual Students Students { get; set; }
    public Guid SchoolId { get; set; }
    public virtual Schools Schools { get; set; }
    public DateTime RequestDate { get; set; }
    public StatusRequest Status { get; set; }
    public string AdditionalInfo { get; set; }
}