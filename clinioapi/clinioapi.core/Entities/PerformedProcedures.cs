using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace clinioapi.core.Entities
{
    public class PerformedProcedures
    {
        public string Id { get; set; }
        public string ProcedureId { get; set; }
        public string AppointmentId { get; set; }
        public string PatientId { get; set; }

        public int? ToothId{ get; set; }

        public virtual Patient Patient{ get; set; }
        public virtual Procedure Procedure{ get; set; }
        public virtual Appointment Appointment{ get; set; }
        
    }
    namespace Mapping{
            public class PerformedProceduresMap: IEntityTypeConfiguration<PerformedProcedures>{
                public void Configure(EntityTypeBuilder<PerformedProcedures> builder)
                {
                    builder.HasKey(p => p.Id);
                    builder.Property(p => p.Id).HasMaxLength(36).ValueGeneratedOnAdd();
                    builder.HasOne(p=>p.Appointment).WithMany(a=>a.PerformedProceduress).HasForeignKey(p=>p.AppointmentId);
                    builder.HasOne(p=>p.Procedure).WithMany().HasForeignKey(p=>p.ProcedureId);
                    builder.HasOne(p=>p.Patient).WithMany().HasForeignKey(p=>p.PatientId);
                }
            }
        }
}