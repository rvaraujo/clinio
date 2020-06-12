using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace clinioapi.core.Entities
{
    public class Procedure
    {
        public string Id { get; set; }
        public string Description { get; set; }
    }

        namespace Mapping{
            public class ProcedureMap: IEntityTypeConfiguration<Procedure>{
                public void Configure(EntityTypeBuilder<Procedure> builder)
                {
                    builder.HasKey(p => p.Id);
                    builder.Property(p => p.Id).HasMaxLength(36).ValueGeneratedOnAdd();
                    builder.Property(p => p.Description).IsRequired().HasMaxLength(300);
                }
            }
        }
}