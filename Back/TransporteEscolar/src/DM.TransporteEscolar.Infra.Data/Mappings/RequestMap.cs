using DM.TransporteEscolar.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DM.TransporteEscolar.Infra.Data.Mappings;
public class RequestMap : IEntityTypeConfiguration<Request>
{
    public void Configure(EntityTypeBuilder<Request> builder)
    {
        builder.ToTable("Requests");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Date).IsRequired();
        builder.Property(x => x.Status).IsRequired().HasConversion<string>();
        builder.Property(x => x.StudentId).IsRequired();
        builder.Property(x => x.SchoolId).IsRequired();

        builder.HasOne(x => x.Student)
            .WithMany(s => s.Requests)
            .HasForeignKey(x => x.StudentId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(x => x.School)
            .WithMany(s => s.Requests)
            .HasForeignKey(x => x.SchoolId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
