using DM.TransporteEscolar.Domain.Entities;

namespace DM.TransporteEscolar.Domain.Interfaces.Services;

public interface IStudentService
{
    Task<Student> AddAsync(Student student);
    Task<Student?> UpdateAsync(Student student, Guid id);
    Task DeleteAsync(Guid id);
}
