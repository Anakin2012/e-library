using IdentityServer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Data.EntityTypeConfigurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {

            builder.HasData(
                new Role
                {
                    Id = 1,
                    Name = "Administrator",
                    NormalizedName = "ADMINISTRATOR"
                },
                new Role
                {
                    Id = 2,
                    Name = "Member",
                    NormalizedName = "MEMBER"
                },
                new Role
                {
                    Id = 3,
                    Name = "PremiumMember",
                    NormalizedName = "PREMIUMMEMBER"
                }
            ); ; ;

        }
    }
}
