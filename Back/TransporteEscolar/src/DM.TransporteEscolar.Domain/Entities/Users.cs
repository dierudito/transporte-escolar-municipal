using DM.TransporteEscolar.Domain.Entities.Base;
using DM.TransporteEscolar.Domain.Enums;

namespace DM.TransporteEscolar.Domain.Entities;
public class Users : EntityBase
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public UserType UserType { get; set; }
    public string Phone { get; set; }
    public string Cpf { get; set; }
    public string Address { get; set; }
}
