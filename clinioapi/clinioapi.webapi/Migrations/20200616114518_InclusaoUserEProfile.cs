using Microsoft.EntityFrameworkCore.Migrations;

namespace clinioapi.webapi.Migrations
{
    public partial class InclusaoUserEProfile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "Dentists");

            migrationBuilder.CreateTable(
                name: "Profiles",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    Description = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    Login = table.Column<string>(maxLength: 20, nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Password = table.Column<string>(maxLength: 84, nullable: false),
                    ProfileId = table.Column<string>(maxLength: 36, nullable: false),
                    Email = table.Column<string>(maxLength: 150, nullable: false),
                    Active = table.Column<bool>(nullable: false, defaultValue: true),
                    Picture = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Profiles_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_ProfileId",
                table: "Users",
                column: "ProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Profiles");

            migrationBuilder.AddColumn<string>(
                name: "ProfilePicture",
                table: "Dentists",
                type: "text",
                nullable: true);
        }
    }
}
