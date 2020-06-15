using Microsoft.EntityFrameworkCore.Migrations;

namespace clinioapi.webapi.Migrations
{
    public partial class InclusaoColunaCPFPaciente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DocumentId",
                table: "Patients",
                maxLength: 11,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocumentId",
                table: "Patients");
        }
    }
}
