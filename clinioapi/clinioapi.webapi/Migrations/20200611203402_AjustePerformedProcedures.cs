using Microsoft.EntityFrameworkCore.Migrations;

namespace clinioapi.webapi.Migrations
{
    public partial class AjustePerformedProcedures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PerformedProcedures_Appointments_AppointmentId",
                table: "PerformedProcedures");

            migrationBuilder.DropForeignKey(
                name: "FK_PerformedProcedures_Patients_PatientId",
                table: "PerformedProcedures");

            migrationBuilder.DropForeignKey(
                name: "FK_PerformedProcedures_Procedures_ProcedureId",
                table: "PerformedProcedures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PerformedProcedures",
                table: "PerformedProcedures");

            migrationBuilder.AlterColumn<string>(
                name: "ProcedureId",
                table: "PerformedProcedures",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(36)");

            migrationBuilder.AlterColumn<string>(
                name: "AppointmentId",
                table: "PerformedProcedures",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(36)");

            migrationBuilder.AlterColumn<string>(
                name: "PatientId",
                table: "PerformedProcedures",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(36)");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "PerformedProcedures",
                maxLength: 36,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PerformedProcedures",
                table: "PerformedProcedures",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PerformedProcedures_Appointments_AppointmentId",
                table: "PerformedProcedures",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PerformedProcedures_Patients_PatientId",
                table: "PerformedProcedures",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PerformedProcedures_Procedures_ProcedureId",
                table: "PerformedProcedures",
                column: "ProcedureId",
                principalTable: "Procedures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PerformedProcedures_Appointments_AppointmentId",
                table: "PerformedProcedures");

            migrationBuilder.DropForeignKey(
                name: "FK_PerformedProcedures_Patients_PatientId",
                table: "PerformedProcedures");

            migrationBuilder.DropForeignKey(
                name: "FK_PerformedProcedures_Procedures_ProcedureId",
                table: "PerformedProcedures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PerformedProcedures",
                table: "PerformedProcedures");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "PerformedProcedures");

            migrationBuilder.AlterColumn<string>(
                name: "ProcedureId",
                table: "PerformedProcedures",
                type: "character varying(36)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PatientId",
                table: "PerformedProcedures",
                type: "character varying(36)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AppointmentId",
                table: "PerformedProcedures",
                type: "character varying(36)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PerformedProcedures",
                table: "PerformedProcedures",
                columns: new[] { "PatientId", "AppointmentId", "ProcedureId" });

            migrationBuilder.AddForeignKey(
                name: "FK_PerformedProcedures_Appointments_AppointmentId",
                table: "PerformedProcedures",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PerformedProcedures_Patients_PatientId",
                table: "PerformedProcedures",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PerformedProcedures_Procedures_ProcedureId",
                table: "PerformedProcedures",
                column: "ProcedureId",
                principalTable: "Procedures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
