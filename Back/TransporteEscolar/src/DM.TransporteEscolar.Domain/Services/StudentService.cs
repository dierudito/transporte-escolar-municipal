using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;

namespace DM.TransporteEscolar.Domain.Services;

public class StudentService(IStudentRepository repository) : IStudentService
{
    public async Task<Student> AddAsync(Student student) =>
        await repository.AddAsync(student);

    public async Task DeleteAsync(Guid id) =>
        await repository.DeleteAsync(id);

    public async Task<Student?> UpdateAsync(Student student, Guid id) =>
        await repository.UpdateAsync(student, id);
}
