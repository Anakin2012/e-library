using MailService.SendingMailsService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailService.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class MailController : ControllerBase
    {
        public MailController()
        {
        }
    }
}
