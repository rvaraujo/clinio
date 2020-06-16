using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace clinioapi.core.Entities
{
    public class Profile
    {
        public string Id { get; set; }
        public string Description { get; set; }
    }
    
      namespace Mapping{
        public class ProfileMap: IEntityTypeConfiguration<Profile>{
             public void Configure(EntityTypeBuilder<Profile> builder)
                {
                    builder.HasKey(p => p.Id);
                    builder.Property(p => p.Id).HasMaxLength(36).ValueGeneratedOnAdd();
                    builder.Property(p => p.Description).IsRequired().HasMaxLength(50);
                }
        }
    }
}