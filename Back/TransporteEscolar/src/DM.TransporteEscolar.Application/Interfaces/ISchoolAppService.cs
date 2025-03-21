using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;

namespace DM.TransporteEscolar.Application.Interfaces;

public interface ISchoolAppService
{
    Task<Response<SchoolResponseViewModel>> AddAsync(AddSchoolRequestViewModel school);

    Task<Response<bool>> UpdateAsync(UpdateSchoolRequestViewModel school, Guid id);

    Task<Response<bool>> DeleteAsync(Guid id);

    Task<Response<SchoolResponseViewModel>> GetByIdAsync(Guid id);

    Task<Response<List<SchoolResponseViewModel>>> GetAllAsync();
}
