using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Infra.Data.Context;
using DM.TransporteEscolar.Infra.Data.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace DM.TransporteEscolar.Infra.Data.Repository;
[ExcludeFromCodeCoverage]
public class UserRepository(TransporteEscolarDbContext db) : BaseRepository<User>(db), IUserRepository
{
    public async Task<User?> GetUserByEmailAsync(string email) =>
        await db.Users.FirstOrDefaultAsync(user => user.Email == email);
}