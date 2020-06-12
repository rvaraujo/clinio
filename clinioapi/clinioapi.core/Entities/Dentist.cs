using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace clinioapi.core.Entities
{
    public class Dentist
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string DocumentId { get; set; }
        public string ProfessionalId { get; set; }
        public virtual Gender Gender { get; set; }
        public string  GenderId { get; set; }
        public string ProfilePicture { get; set; }
        public string Telephone { get; set; }

        public override string ToString(){
            if(this.Gender.Description.ToUpper().Equals("FEMININO"))
                return $"Dra. {this.Name}";
                
            return $"Dr. {this.Name}";
        }


    }
    namespace Mapping{
            public class DentistMap: IEntityTypeConfiguration<Dentist>{
                public void Configure(EntityTypeBuilder<Dentist> builder)
                {
                    builder.HasKey(p => p.Id);
                    builder.Property(p => p.Id).HasMaxLength(36).ValueGeneratedOnAdd();
                    builder.Property(p => p.Name).IsRequired().HasMaxLength(200);
                    builder.Property(p => p.BirthDate).IsRequired();
                    builder.Property(p => p.GenderId).IsRequired();
                    builder.Property(p => p.ProfessionalId).IsRequired().HasMaxLength(50);
                    builder.Property(p => p.DocumentId).IsRequired().HasMaxLength(11);
                    builder.Property(p => p.Telephone).HasMaxLength(14);
                    
                    builder.HasOne(p=>p.Gender).WithMany().HasForeignKey(p=>p.GenderId);
                }
            }
        } 
}