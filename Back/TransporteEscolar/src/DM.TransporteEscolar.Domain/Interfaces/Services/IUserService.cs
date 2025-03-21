using DM.TransporteEscolar.Domain.Entities;

namespace DM.TransporteEscolar.Domain.Interfaces.Services;
public interface IUserService
{
    Task<User> AddAsync(User user);
    Task<User?> UpdateAsync(User user, Guid id);
    Task DeleteAsync(Guid id);
}