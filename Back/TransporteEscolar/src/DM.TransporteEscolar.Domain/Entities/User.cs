using DM.TransporteEscolar.Domain.Entities.Base;
using DM.TransporteEscolar.Domain.Enums;

namespace DM.TransporteEscolar.Domain.Entities;
public class User : Entity
{
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public UserType UserType { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
}
