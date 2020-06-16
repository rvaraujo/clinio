﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using clinioapi.infrastructure;

namespace clinioapi.webapi.Migrations
{
    [DbContext(typeof(ClinioContext))]
    partial class ClinioContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("clinioapi.core.Entities.Appointment", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("character varying(36)")
                        .HasMaxLength(36);

                    b.Property<bool>("Confirmed")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("DentistId")
                        .IsRequired()
                        .HasColumnType("character varying(36)");

                    b.Property<string>("PatientId")
                        .IsRequired()
                        .HasColumnType("character varying(36)");

                    b.Property<bool>("Realized")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.HasKey("Id");

                    b.HasIndex("DentistId");

                    b.HasIndex("PatientId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("clinioapi.core.Entities.Dentist", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("character varying(36)")
                        .HasMaxLength(36);

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("DocumentId")
                        .IsRequired()
                        .HasColumnType("character varying(11)")
                        .HasMaxLength(11);

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("GenderId")
                        .IsRequired()
                        .HasColumnType("character varying(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("character varying(200)")
                        .HasMaxLength(200);

                    b.Property<string>("ProfessionalId")
                        .IsRequired()
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Telephone")
                        .HasColumnType("character varying(14)")
                        .HasMaxLength(14);

                    b.HasKey("Id");

                    b.HasIndex("DocumentId")
                        .IsUnique();

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("GenderId");

                    b.HasIndex("ProfessionalId")
                        .IsUnique();

                    b.ToTable("Dentists");
                });

            modelBuilder.Entity("clinioapi.core.Entities.Gender", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("character varying(36)")
                        .HasMaxLength(36);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Genders");
                });

            modelBuilder.Entity("clinioapi.core.Entities.Insurance", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("character varying(36)")
                        .HasMaxLength(36);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("character varying(100)")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Insurances");
                });

            modelBuilder.Entity("clinioapi.core.Entities.Patient", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("character varying(36)")
                        .HasMaxLength(36);

                    b.Property<string>("Address")
                        .HasColumnType("character varying(300)")
                        .HasMaxLength(300);

                    b.Property<string>("AddressNumber")
                        .HasColumnType("character varying(10)")
                        .HasMaxLength(10);

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("City")
                        .HasColumnType("character varying(100)")
                        .HasMaxLength(100);

                    b.Property<string>("Complement")
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.Property<string>("DocumentId")
                        .HasColumnType("character varying(11)")
                        .HasMaxLength(11);

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("GenderId")
                        .IsRequired()
                        .HasColumnType("character varying(36)");

                    b.Property<string>("InsuranceId")
                        .IsRequired()
                        .HasColumnType("character varying(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("character varying(200)")
                        .HasMaxLength(200);

                    b.Property<string>("Neighborhood")
                        .HasColumnType("character varying(100)")
                        .HasMaxLength(100);

                    b.Property<string>("PostalCode")
                        .HasColumnType("character varying(8)")
                        .HasMaxLength(8);

                    b.Property<string>("State")
                        .HasColumnType("character varying(2)")
                        .HasMaxLength(2);

                    b.Property<string>("Telephone")
                        .HasColumnType("character varying(14)")
                        .HasMaxLength(14);

                    b.HasKey("Id");

                    b.HasIndex("DocumentId")
                        .IsUnique();

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("GenderId");

                    b.HasIndex("InsuranceId");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("clinioapi.core.Entities.PerformedProcedures", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("character varying(36)")
                        .HasMaxLength(36);

                    b.Property<string>("AppointmentId")
                        .HasColumnType("character varying(36)");

                    b.Property<string>("Comments")
                        .HasColumnType("text");

                    b.Property<string>("PatientId")
                        .HasColumnType("character varying(36)");

                    b.Property<string>("ProcedureId")
                        .HasColumnType("character varying(36)");

                    b.Property<int?>("ToothId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AppointmentId");

                    b.HasIndex("ProcedureId");

                    b.HasIndex("PatientId", "ToothId");

                    b.ToTable("PerformedProcedures");
                });

            modelBuilder.Entity("clinioapi.core.Entities.Procedure", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("character varying(36)")
                        .HasMaxLength(36);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("character varying(300)")
                        .HasMaxLength(300);

                    b.HasKey("Id");

                    b.ToTable("Procedures");
                });

            modelBuilder.Entity("clinioapi.core.Entities.Profile", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("character varying(36)")
                        .HasMaxLength(36);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("clinioapi.core.Entities.Tooth", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("character varying(100)")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Tooths");
                });

            modelBuilder.Entity("clinioapi.core.Entities.ToothStatus", b =>
                {
                    b.Property<string>("PatientId")
                        .HasColumnType("character varying(36)");

                    b.Property<int>("ToothId")
                        .HasColumnType("integer");

                    b.Property<bool>("Absent")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<bool>("Damaged")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<bool>("Implanted")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<bool>("Recovered")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.HasKey("PatientId", "ToothId");

                    b.HasIndex("ToothId");

                    b.ToTable("ToothStatus");
                });

            modelBuilder.Entity("clinioapi.core.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("character varying(36)")
                        .HasMaxLength(36);

                    b.Property<bool?>("Active")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(true);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("character varying(150)")
                        .HasMaxLength(150);

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("character varying(20)")
                        .HasMaxLength(20);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("character varying(100)")
                        .HasMaxLength(100);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("character varying(84)")
                        .HasMaxLength(84);

                    b.Property<string>("Picture")
                        .HasColumnType("text");

                    b.Property<string>("ProfileId")
                        .IsRequired()
                        .HasColumnType("character varying(36)")
                        .HasMaxLength(36);

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Login")
                        .IsUnique();

                    b.HasIndex("ProfileId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("clinioapi.core.Entities.Appointment", b =>
                {
                    b.HasOne("clinioapi.core.Entities.Dentist", "Dentist")
                        .WithMany()
                        .HasForeignKey("DentistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("clinioapi.core.Entities.Patient", "Patient")
                        .WithMany()
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("clinioapi.core.Entities.Dentist", b =>
                {
                    b.HasOne("clinioapi.core.Entities.Gender", "Gender")
                        .WithMany()
                        .HasForeignKey("GenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("clinioapi.core.Entities.Patient", b =>
                {
                    b.HasOne("clinioapi.core.Entities.Gender", "Gender")
                        .WithMany()
                        .HasForeignKey("GenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("clinioapi.core.Entities.Insurance", "Insurance")
                        .WithMany()
                        .HasForeignKey("InsuranceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("clinioapi.core.Entities.PerformedProcedures", b =>
                {
                    b.HasOne("clinioapi.core.Entities.Appointment", "Appointment")
                        .WithMany("PerformedProceduress")
                        .HasForeignKey("AppointmentId");

                    b.HasOne("clinioapi.core.Entities.Patient", "Patient")
                        .WithMany()
                        .HasForeignKey("PatientId");

                    b.HasOne("clinioapi.core.Entities.Procedure", "Procedure")
                        .WithMany()
                        .HasForeignKey("ProcedureId");

                    b.HasOne("clinioapi.core.Entities.ToothStatus", null)
                        .WithMany("PerformedProcedures")
                        .HasForeignKey("PatientId", "ToothId");
                });

            modelBuilder.Entity("clinioapi.core.Entities.ToothStatus", b =>
                {
                    b.HasOne("clinioapi.core.Entities.Patient", "Patient")
                        .WithMany("ToothStatus")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("clinioapi.core.Entities.Tooth", "Tooth")
                        .WithMany()
                        .HasForeignKey("ToothId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("clinioapi.core.Entities.User", b =>
                {
                    b.HasOne("clinioapi.core.Entities.Profile", "Profile")
                        .WithMany()
                        .HasForeignKey("ProfileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
