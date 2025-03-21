using DM.TransporteEscolar.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DM.TransporteEscolar.Infra.Data.Mappings;
public class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Address).IsRequired(false).HasMaxLength(255);
        builder.Property(x => x.Email).IsRequired().HasMaxLength(255);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(255);
        builder.Property(x => x.Password).IsRequired().HasMaxLength(255);
        builder.Property(x => x.Phone).IsRequired(false).HasMaxLength(20);
        builder.Property(x => x.UserType).IsRequired().HasConversion<string>();

        builder.HasIndex(x => x.Email).IsUnique();
    }
}
