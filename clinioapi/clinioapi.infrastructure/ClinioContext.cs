using clinioapi.core.Entities;
using clinioapi.core.Entities.Mapping;
using Microsoft.EntityFrameworkCore;

namespace clinioapi.infrastructure
{
    public class ClinioContext: DbContext
    {
         public ClinioContext(DbContextOptions<ClinioContext> options):base(options){}

         public DbSet<Patient> Patients { get; set; }
         public DbSet<Dentist> Dentists { get; set; }
         public DbSet<Gender> Genders { get; set; }
         public DbSet<Insurance> Insurances { get; set; }
         public DbSet<Procedure> Procedures { get; set; }
        public DbSet<PerformedProcedures> PerformedProcedures { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Tooth> Tooths { get; set; }
        public DbSet<ToothStatus> ToothStatus { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Profile> Profiles { get; set; }
          protected override void OnModelCreating(ModelBuilder modelBuilder){
              modelBuilder.ApplyConfiguration(new PatientMap());
              modelBuilder.ApplyConfiguration(new GenderMap());
              modelBuilder.ApplyConfiguration(new InsuranceMap());
              modelBuilder.ApplyConfiguration(new DentistMap());
              modelBuilder.ApplyConfiguration(new ProcedureMap());
              modelBuilder.ApplyConfiguration(new PerformedProceduresMap());
              modelBuilder.ApplyConfiguration(new AppointmentMap());
              modelBuilder.ApplyConfiguration(new ToothMap());
              modelBuilder.ApplyConfiguration(new ToothStatusMap());
              modelBuilder.ApplyConfiguration(new UserMap());
              modelBuilder.ApplyConfiguration(new ProfileMap());
          }
    }
}