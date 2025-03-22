using DM.TransporteEscolar.Domain.Dtos;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Infra.Data.Context;
using DM.TransporteEscolar.Infra.Data.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace DM.TransporteEscolar.Infra.Data.Repository;

[ExcludeFromCodeCoverage]
public class TransportRequestRepository(TransporteEscolarDbContext db) : BaseRepository<TransportRequest>(db), ITransportRequestRepository
{    
    public async Task<EntityPagedDto<TransportRequest>> GetPagedDetailAsync(int pageNumber, int pageSize)
    {
        var totalRecords = await _dbSet.CountAsync();
        var totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);
        var result = await _dbSet
            .Include(transportRequest => transportRequest.Student)
            .Include(transportRequest => transportRequest.School)
            .OrderByDescending(transportrequest => transportrequest.Date)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new(
            PageNumber: pageNumber, 
            PageSize: pageSize, 
            TotalPages: totalPages, 
            TotalRecords: totalRecords, 
            Data: result);
    }
}