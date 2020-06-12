using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace clinioapi.webapi.Migrations
{
    public partial class EstruturaStatusDentes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PerformedProcedures",
                table: "PerformedProcedures");

            migrationBuilder.AddColumn<string>(
                name: "PatientId",
                table: "PerformedProcedures",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ToothId",
                table: "PerformedProcedures",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PerformedProcedures",
                table: "PerformedProcedures",
                columns: new[] { "PatientId", "AppointmentId", "ProcedureId" });

            migrationBuilder.CreateTable(
                name: "Tooths",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tooths", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ToothStatus",
                columns: table => new
                {
                    PatientId = table.Column<string>(nullable: false),
                    ToothId = table.Column<int>(nullable: false),
                    Absent = table.Column<bool>(nullable: false, defaultValue: false),
                    Damaged = table.Column<bool>(nullable: false, defaultValue: false),
                    Recovered = table.Column<bool>(nullable: false, defaultValue: false),
                    Implanted = table.Column<bool>(nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToothStatus", x => new { x.PatientId, x.ToothId });
                    table.ForeignKey(
                        name: "FK_ToothStatus_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ToothStatus_Tooths_ToothId",
                        column: x => x.ToothId,
                        principalTable: "Tooths",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PerformedProcedures_AppointmentId",
                table: "PerformedProcedures",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformedProcedures_PatientId_ToothId",
                table: "PerformedProcedures",
                columns: new[] { "PatientId", "ToothId" });

            migrationBuilder.CreateIndex(
                name: "IX_ToothStatus_ToothId",
                table: "ToothStatus",
                column: "ToothId");

            migrationBuilder.AddForeignKey(
                name: "FK_PerformedProcedures_Patients_PatientId",
                table: "PerformedProcedures",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PerformedProcedures_ToothStatus_PatientId_ToothId",
                table: "PerformedProcedures",
                columns: new[] { "PatientId", "ToothId" },
                principalTable: "ToothStatus",
                principalColumns: new[] { "PatientId", "ToothId" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PerformedProcedures_Patients_PatientId",
                table: "PerformedProcedures");

            migrationBuilder.DropForeignKey(
                name: "FK_PerformedProcedures_ToothStatus_PatientId_ToothId",
                table: "PerformedProcedures");

            migrationBuilder.DropTable(
                name: "ToothStatus");

            migrationBuilder.DropTable(
                name: "Tooths");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PerformedProcedures",
                table: "PerformedProcedures");

            migrationBuilder.DropIndex(
                name: "IX_PerformedProcedures_AppointmentId",
                table: "PerformedProcedures");

            migrationBuilder.DropIndex(
                name: "IX_PerformedProcedures_PatientId_ToothId",
                table: "PerformedProcedures");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "PerformedProcedures");

            migrationBuilder.DropColumn(
                name: "ToothId",
                table: "PerformedProcedures");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PerformedProcedures",
                table: "PerformedProcedures",
                columns: new[] { "AppointmentId", "ProcedureId" });
        }
    }
}
