using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Infra.Data.Context;
using DM.TransporteEscolar.Infra.Data.Repository.Base;

namespace DM.TransporteEscolar.Infra.Data.Repository;

public class SchoolRepository(TransporteEscolarDbContext db) : BaseRepository<School>(db), ISchoolRepository
{
}
