using DM.TransporteEscolar.Domain.Entities.Base;

namespace DM.TransporteEscolar.Domain.Dtos;
public record EntityPagedDto<TEntity>(int PageNumber, int PageSize, int TotalPages, 
    int TotalRecords, List<TEntity> Data) where TEntity : Entity, new();