using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;

namespace DM.TransporteEscolar.Application.Interfaces;

public interface ITransportRequestAppService
{
    Task<Response<TransportRequestResponseViewModel>> AddAsync(AddTransportRequestRequestViewModel transportrequest);

    Task<Response<bool>> UpdateAsync(UpdateTransportRequestRequestViewModel transportrequest, Guid id);

    Task<Response<bool>> DeleteAsync(Guid id);

    Task<Response<TransportRequestResponseViewModel>> GetByIdAsync(Guid id);

    Task<Response<List<TransportRequestResponseViewModel>>> GetAllAsync();

    Task<Response<PagedResponseViewModel<TransportRequestDetailResponseViewModel>>> 
        GetPagedDetailAsync(GetTransportRequetsDetailRequestViewModel request);
}