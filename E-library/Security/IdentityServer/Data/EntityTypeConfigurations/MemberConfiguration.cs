using IdentityServer.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Data.EntityTypeConfigurations
{
    public class MemberConfiguration : IEntityTypeConfiguration<Member>
    {
        public void Configure(EntityTypeBuilder<Member> builder)
        {
            builder.Navigation(u => u.RefreshTokens).AutoInclude();

            var admin = new Member
            {
                Id = 1,
                Email = "napoleon77@ethereal.email",
                NormalizedEmail = "NAPOLEON77@ETHEREAL.EMAIL",
                Name = "Admin",
                Surname = "Admin",
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                Credentials = 0,
                IsMembershipPaid = true,
            };

            PasswordHasher<Member> password_hash = new PasswordHasher<Member>();
            admin.PasswordHash = password_hash.HashPassword(admin, "Admin123");


            builder.HasData(admin);

        }
    }
}