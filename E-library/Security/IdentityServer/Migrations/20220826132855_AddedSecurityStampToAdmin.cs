using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityServer.Migrations
{
    public partial class AddedSecurityStampToAdmin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "b377f452-d914-4302-b98d-ab60a1a60228");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "ac466b9d-56f2-408e-98e8-447e6b0f8841");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "83067910-2b18-431c-ad84-bf2f6a4b5db6");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4a95140d-cc34-431b-8530-b66b8516b1a7", "AQAAAAEAACcQAAAAEMGpTNiB9D3kTwSVPo6nCwC1/iMfYo6mB4E2aRn7BPYSOnlxK+AnWm2KG3vKY9n6Mg==", "afc1f903-4205-4909-a952-1a1aa79b40b6" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "3be795b3-981d-4271-92e0-5d57d2801df3");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "e34527ba-5ad5-41ce-b979-900445ce5393");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "6c607bcc-9929-4bad-8d6b-0172d35eb79f");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6af00783-98e5-44d6-93d2-1e21abdbd1b8", "AQAAAAEAACcQAAAAELbU8HfDkG8+zpv0q+0dnZjCU0vtMGfsiCeDO+Np4xN4C1yh4iIZmEIrK3C4uq8Eaw==", null });
        }
    }
}
