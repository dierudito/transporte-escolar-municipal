using DM.TransporteEscolar.Domain.Entities;

namespace DM.TransporteEscolar.Domain.Interfaces.Services;

public interface ISchoolService
{
    Task<School> AddAsync(School school);
    Task<School?> UpdateAsync(School school, Guid id);
    Task DeleteAsync(Guid id);
}
