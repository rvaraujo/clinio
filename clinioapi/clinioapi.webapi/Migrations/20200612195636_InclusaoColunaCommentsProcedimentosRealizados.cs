using Microsoft.EntityFrameworkCore.Migrations;

namespace clinioapi.webapi.Migrations
{
    public partial class InclusaoColunaCommentsProcedimentosRealizados : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comments",
                table: "PerformedProcedures",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comments",
                table: "PerformedProcedures");
        }
    }
}
