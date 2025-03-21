using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;

namespace DM.TransporteEscolar.Domain.Services;
public class UserService(IUserRepository repository) : IUserService
{
    public async Task<User> AddAsync(User user) =>
        await repository.AddAsync(user);

    public async Task DeleteAsync(Guid id) =>
        await repository.DeleteAsync(id);

    public async Task<User?> UpdateAsync(User user, Guid id) =>
        await repository.UpdateAsync(user, id);
}