using DM.TransporteEscolar.Domain.Dtos;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories.Base;

namespace DM.TransporteEscolar.Domain.Interfaces.Repositories;

public interface ITransportRequestRepository : IBaseRepository<TransportRequest>
{
    Task<EntityPagedDto<TransportRequest>> GetPagedDetailAsync(int pageNumber, int pageSize);
}