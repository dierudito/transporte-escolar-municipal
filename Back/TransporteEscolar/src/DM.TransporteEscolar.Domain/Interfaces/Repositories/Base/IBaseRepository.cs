using DM.TransporteEscolar.Domain.Entities.Base;
using System.Linq.Expressions;

namespace DM.TransporteEscolar.Domain.Interfaces.Repositories.Base;

public interface IBaseRepository<TEntity> where TEntity : Entity
{
    Task<TEntity> AddAsync(TEntity entity);
    Task<TEntity?> UpdateAsync(TEntity updated, Guid key);
    Task DeleteAsync(Guid id);
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<TEntity?> GetByIdAsync(Guid id);
    Task<bool> AreThereAsync(Expression<Func<TEntity, bool>> predicate);
    Task SaveChangesAsync();
}