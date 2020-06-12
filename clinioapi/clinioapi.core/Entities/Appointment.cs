using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace clinioapi.core.Entities
{
    public class Appointment
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public string PatientId { get; set; }
        public string DentistId { get; set; }
        public bool Confirmed { get; set; }
        public bool Realized { get; set; }

        public virtual Patient Patient { get; set; }
        public virtual Dentist Dentist { get; set; }

        public virtual IList<PerformedProcedures> PerformedProceduress { get; set; }
    }

    namespace Mapping{
            public class AppointmentMap: IEntityTypeConfiguration<Appointment>{
                public void Configure(EntityTypeBuilder<Appointment> builder)
                {
                    builder.HasKey(a=>a.Id);
                    builder.Property(a => a.Id).HasMaxLength(36).ValueGeneratedOnAdd();
                    builder.Property(a=>a.Date).IsRequired();
                    builder.Property(a=>a.PatientId).IsRequired();
                    builder.Property(a=>a.DentistId).IsRequired();
                    builder.Property(a=>a.Confirmed).HasDefaultValue(false);
                    builder.Property(a=>a.Realized).HasDefaultValue(false);
                    builder.HasOne(a=>a.Dentist).WithMany().HasForeignKey(a=>a.DentistId);
                    builder.HasOne(a=>a.Patient).WithMany().HasForeignKey(a=>a.PatientId);
                    builder.HasMany(a=>a.PerformedProceduress).WithOne(p=>p.Appointment).HasForeignKey(a=>a.AppointmentId);
                }
            }
        }
}