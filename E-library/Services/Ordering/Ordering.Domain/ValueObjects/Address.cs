using Ordering.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Domain.ValueObjects
{
    class Address: ValueObject
    {
        public string Street { get; private set; }
        public string City { get; private set; }
        public string State { get; private set; }
        public string Country { get; private set; }
        public string ZipCode { get; private set; }
        public string EmailAddress { get; private set; }

        public Address(string street, string city, string state, string country, string zipCode, string emailAddress)
        {
            Street = street;
            City = city;
            State = state;
            Country = country;
            ZipCode = zipCode;
            EmailAddress = emailAddress;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Street;
            yield return City;
            yield return State;
            yield return Country;
            yield return ZipCode;
            yield return EmailAddress;
        }
    }
}
