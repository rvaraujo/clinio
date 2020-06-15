using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace clinioapi.core.Entities
{
    public class ToothStatus
    {
        public string PatientId { get; set; }

        public int ToothId { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual Tooth Tooth { get; set; }

        public bool Absent { get; set; }
        public bool Damaged { get; set; }
        public bool Recovered { get; set; }
        public bool Implanted { get; set; }

        public virtual IList<PerformedProcedures> PerformedProcedures{ get; set; }
    }

     namespace Mapping{
        public class ToothStatusMap: IEntityTypeConfiguration<ToothStatus>{
             public void Configure(EntityTypeBuilder<ToothStatus> builder)
                {
                    builder.HasKey(t => new{t.PatientId, t.ToothId});
                    builder.Property(t=>t.Absent).HasDefaultValue(false);
                    builder.Property(t=>t.Damaged).HasDefaultValue(false);
                    builder.Property(t=>t.Recovered).HasDefaultValue(false);
                    builder.Property(t=>t.Implanted).HasDefaultValue(false);

                    //builder.HasOne(t=>t.Patient).WithMany(p=>p.ToothStatus).HasForeignKey(p=>p.PatientId);
                    builder.HasMany(t=>t.PerformedProcedures).WithOne().HasForeignKey(t=>new{t.PatientId,t.ToothId});
                }
        }
    }
}