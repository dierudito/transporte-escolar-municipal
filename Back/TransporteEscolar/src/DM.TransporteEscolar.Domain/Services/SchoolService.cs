using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;

namespace DM.TransporteEscolar.Domain.Services;

public class SchoolService(ISchoolRepository repository) : ISchoolService
{
    public async Task<School> AddAsync(School school) =>
        await repository.AddAsync(school);

    public async Task DeleteAsync(Guid id) =>
        await repository.DeleteAsync(id);

    public async Task<School?> UpdateAsync(School school, Guid id) =>
        await repository.UpdateAsync(school, id);
}
