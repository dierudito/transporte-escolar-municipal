using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;

namespace DM.TransporteEscolar.Application.Interfaces;
public interface IUserAppService
{
    Task<Response<UserResponseViewModel>> AddAsync(AddUserRequestViewModel user);

    Task<Response<bool>> UpdateAsync(UpdateUserRequestViewModel user, Guid id);

    Task<Response<bool>> DeleteAsync(Guid id);

    Task<Response<UserResponseViewModel>> GetByIdAsync(Guid id);

    Task<Response<List<UserResponseViewModel>>> GetAllAsync();
}