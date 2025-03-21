using DM.TransporteEscolar.Domain.Entities;

namespace DM.TransporteEscolar.Domain.Interfaces.Services;

public interface ITransportRequestService
{
    Task<TransportRequest> AddAsync(TransportRequest transportRequest);
    Task<TransportRequest?> UpdateAsync(TransportRequest transportRequest, Guid id);
    Task DeleteAsync(Guid id);
}