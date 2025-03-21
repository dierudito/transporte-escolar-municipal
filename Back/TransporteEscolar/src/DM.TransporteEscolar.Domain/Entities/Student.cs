using DM.TransporteEscolar.Domain.Entities.Base;

namespace DM.TransporteEscolar.Domain.Entities;

public class Student : Entity
{
    public string Name { get; set; }
    public DateOnly BirthDate { get; set; }
    public string Address { get; set; }
    public string ZipCode { get; set; }
    public string? Cpf { get; set; }
    public Guid UserId { get; set; }
    public virtual User Users { get; set; }
    public ICollection<TransportRequest> TransportRequests { get; set; }
}
