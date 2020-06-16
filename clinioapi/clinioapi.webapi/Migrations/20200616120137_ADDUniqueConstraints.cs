using Microsoft.EntityFrameworkCore.Migrations;

namespace clinioapi.webapi.Migrations
{
    public partial class ADDUniqueConstraints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Login",
                table: "Users",
                column: "Login",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_DocumentId",
                table: "Patients",
                column: "DocumentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_Email",
                table: "Patients",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dentists_DocumentId",
                table: "Dentists",
                column: "DocumentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dentists_Email",
                table: "Dentists",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dentists_ProfessionalId",
                table: "Dentists",
                column: "ProfessionalId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Login",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Patients_DocumentId",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_Email",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Dentists_DocumentId",
                table: "Dentists");

            migrationBuilder.DropIndex(
                name: "IX_Dentists_Email",
                table: "Dentists");

            migrationBuilder.DropIndex(
                name: "IX_Dentists_ProfessionalId",
                table: "Dentists");
        }
    }
}
