using DM.TransporteEscolar.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace DM.TransporteEscolar.Infra.Data.Context;
public class TransporteEscolarDbContext(DbContextOptions<TransporteEscolarDbContext> options) :
    DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<TransportRequest> Requests { get; set; }
    public DbSet<School> Schools { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }
}
