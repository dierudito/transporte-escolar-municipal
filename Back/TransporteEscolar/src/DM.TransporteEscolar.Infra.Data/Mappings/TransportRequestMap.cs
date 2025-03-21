using DM.TransporteEscolar.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DM.TransporteEscolar.Infra.Data.Mappings;
public class TransportRequestMap : IEntityTypeConfiguration<TransportRequest>
{
    public void Configure(EntityTypeBuilder<TransportRequest> builder)
    {
        builder.ToTable("transport_requests");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Date).IsRequired();
        builder.Property(x => x.Status).IsRequired().HasConversion<string>();
        builder.Property(x => x.StudentId).IsRequired();
        builder.Property(x => x.SchoolId).IsRequired();

        builder.HasOne(x => x.Student)
            .WithMany(s => s.TransportRequests)
            .HasForeignKey(x => x.StudentId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(x => x.School)
            .WithMany(s => s.TransportRequests)
            .HasForeignKey(x => x.SchoolId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
