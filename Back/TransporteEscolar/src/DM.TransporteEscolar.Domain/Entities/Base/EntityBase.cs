namespace DM.TransporteEscolar.Domain.Entities.Base;
public abstract class EntityBase
{
    public Guid Id { get; set; } = Guid.NewGuid();
}