using DM.TransporteEscolar.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Reflection;
using System.Runtime.InteropServices;

namespace DM.TransporteEscolar.Infra.Data.Context;
public class TransporteEscolarDbContext :
    DbContext
{
    private readonly TimeZoneInfo _targetTimeZone;
    public DbSet<User> Users { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<TransportRequest> Requests { get; set; }
    public DbSet<School> Schools { get; set; }

    public TransporteEscolarDbContext(DbContextOptions<TransporteEscolarDbContext> options) : base(options)
    {
        _targetTimeZone = GetTargetTimeZone();
        ChangeTracker.Tracked += ConvertDateTimeToLocal;
        ChangeTracker.StateChanged += ConvertDateTimeToLocal;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
    {
        OnBeforeSaving();
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }


    private void OnBeforeSaving()
    {
        var entries = ChangeTracker.Entries();

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added || entry.State == EntityState.Modified)
            {
                foreach (var property in entry.Properties)
                {
                    if (property.CurrentValue is DateTime dateTime && property.Metadata.ClrType == typeof(DateTime))
                    {
                        property.CurrentValue = dateTime.ToUniversalTime();
                    }
                }
            }
        }
    }

    private void ConvertDateTimeToLocal(object? sender, EntityEntryEventArgs? e)
    {
        if (e.Entry.State == EntityState.Unchanged || e.Entry.State == EntityState.Modified)
        {
            foreach (var property in e.Entry.Properties)
            {
                if (property.CurrentValue is DateTime utcDateTime && property.Metadata.ClrType == typeof(DateTime))
                {
                    property.CurrentValue = TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, _targetTimeZone);
                }
            }
        }
    }

    private TimeZoneInfo GetTargetTimeZone()
    {
        try
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                return TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
            else
                return TimeZoneInfo.FindSystemTimeZoneById("America/Sao_Paulo");
        }
        catch (TimeZoneNotFoundException)
        {
            return TimeZoneInfo.Utc;
        }
    }
}
