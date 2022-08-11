using AutoMapper;
using EventBus.Messages.Events;
using MailService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.Mapper
{
    public class MailProfile : Profile
    {
        public MailProfile()
        {
            CreateMap<MembershipExpiringModel, MembershipExpiringEvent>().ReverseMap();
        
        }
    }
}
