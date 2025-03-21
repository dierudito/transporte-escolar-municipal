using DM.TransporteEscolar.Domain.Entities.Base;

namespace DM.TransporteEscolar.Domain.Entities;

public class Students : EntityBase
{
    public string Name { get; set; }
    public DateOnly BirthDate { get; set; }
    public string Address { get; set; }
    public string ZipCode { get; set; }
    public Guid UserId { get; set; }
    public virtual Users Users { get; set; }
}
