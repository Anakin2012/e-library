using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.Messages.Events
{
    public class CartItem
    {
        public string BookTitle { get; set; }
        public string BookId { get; set; }
        public string BookAuthor { get; set; }
        public string BookGenre { get; set; }
        public string Language { get; set; }
        public bool IsPremium { get; set; }
        public string CoverImageFile { get; set; }
    }
    public class CartCheckoutEvent : IntegrationBaseEvent
    {

        // Address
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string EmailAddress { get; set; }

        // Order
        public string Username { get; set; }
        public IEnumerable<CartItem> OrderItems { get; set; }
    }
}
