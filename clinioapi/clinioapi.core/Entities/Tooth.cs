using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace clinioapi.core.Entities
{
    public class Tooth
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }

    namespace Mapping{
        public class ToothMap: IEntityTypeConfiguration<Tooth>{
             public void Configure(EntityTypeBuilder<Tooth> builder)
                {
                    builder.HasKey(g => g.Id);
                    builder.Property(g => g.Description).IsRequired().HasMaxLength(100);
                }
        }
    }
}