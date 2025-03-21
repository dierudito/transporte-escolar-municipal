using DM.TransporteEscolar.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DM.TransporteEscolar.Infra.Data.Mappings;
public class StudentMap : IEntityTypeConfiguration<Student>
{
    public void Configure(EntityTypeBuilder<Student> builder)
    {
        builder.ToTable("Students");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Address).IsRequired().HasMaxLength(255);
        builder.Property(x => x.BirthDate).IsRequired();
        builder.Property(x => x.Cpf).IsRequired(false).HasMaxLength(11);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(255);
        builder.Property(x => x.UserId).IsRequired();

        builder.HasOne(x => x.Users)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
