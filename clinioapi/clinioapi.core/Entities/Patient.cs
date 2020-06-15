using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace clinioapi.core.Entities
{
    public class Patient
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string DocumentId { get; set; }
        public virtual Gender Gender { get; set; }
        public string  GenderId { get; set; }
        public virtual Insurance Insurance { get; set; }
        public string  InsuranceId { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string AddressNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Complement { get; set; }
        public string Neighborhood { get; set; }
        public string Telephone { get; set; }
        public virtual IList<ToothStatus> ToothStatus{ get; set; }
    }
        namespace Mapping{
            public class PatientMap: IEntityTypeConfiguration<Patient>{
                public void Configure(EntityTypeBuilder<Patient> builder)
                {
                    builder.HasKey(p => p.Id);
                    builder.Property(p => p.Id).HasMaxLength(36).ValueGeneratedOnAdd();
                    builder.Property(p => p.Name).IsRequired().HasMaxLength(200);
                    builder.Property(p => p.BirthDate).IsRequired();
                    builder.Property(p => p.GenderId).IsRequired();
                    builder.Property(p => p.DocumentId).HasMaxLength(11);
                    builder.Property(p => p.InsuranceId).IsRequired();
                    builder.Property(p => p.PostalCode).HasMaxLength(8);
                    builder.Property(p => p.City).HasMaxLength(100);
                    builder.Property(p => p.State).HasMaxLength(2);
                    builder.Property(p => p.Neighborhood).HasMaxLength(100);
                    builder.Property(p => p.Complement).HasMaxLength(50);
                    builder.Property(p => p.Telephone).HasMaxLength(14);
                    builder.Property(p => p.AddressNumber).HasMaxLength(10);
                    builder.Property(p => p.Address).HasMaxLength(300);

                    builder.HasMany(p=>p.ToothStatus).WithOne(ts=>ts.Patient).HasForeignKey(ts=>ts.PatientId);

                    builder.HasOne(p=>p.Insurance).WithMany().HasForeignKey(p=>p.InsuranceId);
                    builder.HasOne(p=>p.Gender).WithMany().HasForeignKey(p=>p.GenderId);
                }
            }
        } 
        
    
}