﻿using AutoMapper;
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
        // preslikavanje izmedju MembershipExpiringEvent-a i Komande
        public MailProfile()
        {
            CreateMap<MembershipExpiringModel, MembershipExpiringEvent>().ReverseMap();
        
        }
    }
}
