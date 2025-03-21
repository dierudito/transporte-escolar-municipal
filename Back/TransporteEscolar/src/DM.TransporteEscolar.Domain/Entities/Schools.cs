using DM.TransporteEscolar.Domain.Entities.Base;

namespace DM.TransporteEscolar.Domain.Entities;

public class Schools : EntityBase
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string ZipCode { get; set; }
    public string Phone { get; set; }
}
