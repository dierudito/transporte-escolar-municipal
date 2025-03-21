using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;

namespace DM.TransporteEscolar.Domain.Services;

public class TransportRequestService(ITransportRequestRepository repository) : ITransportRequestService
{
    public async Task<TransportRequest> AddAsync(TransportRequest transportRequest) =>
        await repository.AddAsync(transportRequest);

    public async Task DeleteAsync(Guid id) =>
        await repository.DeleteAsync(id);

    public async Task<TransportRequest?> UpdateAsync(TransportRequest transportRequest, Guid id) =>
        await repository.UpdateAsync(transportRequest, id);
}