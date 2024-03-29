﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.Models
{
    public class PayingModel
    {
        [EmailAddress]
        public string To { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
