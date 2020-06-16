using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace clinioapi.core.Entities
{
    public class User
    {
        
        public string Id { get; set; }
        
        public string Login { get; set; }
        
        public string Name { get; set; }
        
        public string Password { get; set; }
       
        public string ProfileId { get; set; }

        public virtual Profile Profile { get; set; }
        
        public string Email { get; set; }

        public bool? Active { get; set; }

        public string Picture { get; set; }
    }

     namespace Mapping{
        public class UserMap: IEntityTypeConfiguration<User>{
             public void Configure(EntityTypeBuilder<User> builder)
                {
                    builder.HasKey(u => u.Id);
                    builder.Property(u => u.Id).HasMaxLength(36).ValueGeneratedOnAdd();
                    builder.Property(u => u.Login).IsRequired().HasMaxLength(20);
                    builder.Property(u => u.Name).IsRequired().HasMaxLength(100);
                    builder.Property(u => u.ProfileId).IsRequired().HasMaxLength(36);
                    builder.Property(u => u.Password).IsRequired().HasMaxLength(84);
                    builder.Property(u => u.Email).IsRequired().HasMaxLength(150);
                    builder.Property(u => u.Active).IsRequired().HasDefaultValue(true);

                    builder.HasIndex(u=>u.Login).IsUnique();
                    builder.HasIndex(u=>u.Email).IsUnique();

                    builder.HasOne(u=>u.Profile).WithMany().HasForeignKey(u=>u.ProfileId);
                }
        }
    }
}