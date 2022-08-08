using MailService.Entities;
using MailService.Repositories;
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
        private readonly IMailRepository _repository;

        public MailController(IMailRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Mail>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Mail>>> GetMails()
        {
            var mails = await _repository.GetMails();
            return Ok(mails);
        }

        [HttpGet("{id}", Name = "GetMail")]
        [ProducesResponseType(typeof(Mail), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Mail), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Mail>> GetMailById(string id)
        {
            var mail = await _repository.GetMail(id);
            if (mail == null)
            {
                return NotFound(null);
            }
            return Ok(mail);
        }

    }
}
