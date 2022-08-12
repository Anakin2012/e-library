using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.Messages.Events
{
    public class ChangePasswordEvent : IntegrationBaseEvent
    {
        [EmailAddress]
        public string To { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }

        public ChangePasswordEvent(string to, string name, string surname, string oldPassword, string newPassword)
        {
            To = to ?? throw new ArgumentNullException(nameof(to));
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Surname = surname ?? throw new ArgumentNullException(nameof(surname));
            OldPassword = oldPassword ?? throw new ArgumentNullException(nameof(oldPassword));
            NewPassword = newPassword ?? throw new ArgumentNullException(nameof(newPassword));
        }
    }
}
