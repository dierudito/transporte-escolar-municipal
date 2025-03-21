using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;

namespace DM.TransporteEscolar.Application.Interfaces;

public interface IStudentAppService
{
    Task<Response<StudentResponseViewModel>> AddAsync(AddStudentRequestViewModel student);

    Task<Response<bool>> UpdateAsync(UpdateStudentRequestViewModel student, Guid id);

    Task<Response<bool>> DeleteAsync(Guid id);

    Task<Response<StudentResponseViewModel>> GetByIdAsync(Guid id);

    Task<Response<List<StudentResponseViewModel>>> GetAllAsync();
}
