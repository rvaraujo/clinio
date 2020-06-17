using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace clinioapi.core.Entities
{
    public class CidCatalog
    {
        public string Id { get; set; }
        public string Description { get; set; }
    }

    namespace Mapping{
        public class CidCatalogMap: IEntityTypeConfiguration<CidCatalog>{
             public void Configure(EntityTypeBuilder<CidCatalog> builder)
                {
                    builder.HasKey(g => g.Id);
                    builder.Property(g => g.Id).HasMaxLength(5);
                    builder.Property(g => g.Description).IsRequired().HasMaxLength(150);
                }
        }
    }


}