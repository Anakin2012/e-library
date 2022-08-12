using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.Messages.Events
{
    public class PayingEvent : IntegrationBaseEvent
    {
        [EmailAddress]
        public string To { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public PayingEvent(string to, string name, string surname)
        {
            To = to ?? throw new ArgumentNullException(nameof(to));
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Surname = surname ?? throw new ArgumentNullException(nameof(surname));
        }
    }
}
