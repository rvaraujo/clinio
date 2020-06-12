using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace clinioapi.core.Entities
{
    public class Gender
    {
        public string Id { get; set; }
        public string Description { get; set; }

        
    }
    namespace Mapping{
        public class GenderMap: IEntityTypeConfiguration<Gender>{
             public void Configure(EntityTypeBuilder<Gender> builder)
                {
                    builder.HasKey(g => g.Id);
                    builder.Property(g => g.Id).HasMaxLength(36).ValueGeneratedOnAdd();
                    builder.Property(g => g.Description).IsRequired().HasMaxLength(50);
                }
        }
    }
}