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

        //public string ProfilePicture { get; set; }
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
                    builder.HasKey(d => d.Id);
                    builder.Property(d => d.Id).HasMaxLength(36).ValueGeneratedOnAdd();
                    builder.Property(d => d.Name).IsRequired().HasMaxLength(200);
                    builder.Property(d => d.BirthDate).IsRequired();
                    builder.Property(d => d.GenderId).IsRequired();
                    builder.Property(d => d.ProfessionalId).IsRequired().HasMaxLength(50);
                    builder.Property(d => d.DocumentId).IsRequired().HasMaxLength(11);
                    builder.Property(d => d.Telephone).HasMaxLength(14);
                    
                    builder.HasIndex(d=>d.DocumentId).IsUnique();
                    builder.HasIndex(d=>d.Email).IsUnique();
                    builder.HasIndex(d=>d.ProfessionalId).IsUnique();

                    builder.HasOne(d=>d.Gender).WithMany().HasForeignKey(p=>p.GenderId);
                }
            }
        } 
}