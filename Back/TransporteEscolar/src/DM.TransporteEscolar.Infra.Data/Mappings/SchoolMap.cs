using DM.TransporteEscolar.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DM.TransporteEscolar.Infra.Data.Mappings;
public class SchoolMap : IEntityTypeConfiguration<School>
{
    public void Configure(EntityTypeBuilder<School> builder)
    {
        builder.ToTable("Schools");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Address).IsRequired().HasMaxLength(255);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(255);
        builder.Property(x => x.Phone).IsRequired().HasMaxLength(20);
        builder.Property(x => x.ZipCode).IsRequired().HasMaxLength(8);
    }
}
