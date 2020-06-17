using Microsoft.EntityFrameworkCore.Migrations;

namespace clinioapi.webapi.Migrations
{
    public partial class ADDCidCatalog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CidCatalog",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 5, nullable: false),
                    Description = table.Column<string>(maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CidCatalog", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CidCatalog");
        }
    }
}
