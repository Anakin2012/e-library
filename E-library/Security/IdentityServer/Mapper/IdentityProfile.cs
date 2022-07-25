using System;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer.Entities;
using IdentityServer.DTOs;

namespace IdentityServer.Mapper
{
    public class IdentityProfile : Profile
    {
        public IdentityProfile()
        {
            CreateMap<Member, NewMemberEmailDTO>().ReverseMap();
            CreateMap<Member, MemberDetailsDTO>().ReverseMap();
        }
    }
}
