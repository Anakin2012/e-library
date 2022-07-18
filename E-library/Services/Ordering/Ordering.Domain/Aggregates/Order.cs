using Ordering.Domain.Common;
using Ordering.Domain.Entites;
using Ordering.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Domain.Aggregates
{
    class Order:AggregateRoot
    {

        public string CustomerId { get; private set; }

        public string Username { get; private set; }

        public DateTime OrderDate { get; private set; }

        public Address Address { get; private set; }

        private readonly List<OrderItem> _orderItems = new List<OrderItem>();
        public IReadOnlyCollection<OrderItem> OrderItems => _orderItems;

        public Order(string customerId, string username, Address address)
        {
            CustomerId = customerId ?? throw new ArgumentNullException(nameof(customerId));
            Username = username ?? throw new ArgumentNullException(nameof(username));
            Address = address ?? throw new ArgumentNullException(nameof(address));
            OrderDate = DateTime.Now;

        }

        public Order(int id , string  customerId, string username, Address address)
            :this(customerId, username, address)
        {
            Id = id;
        }

        public void AddOrderItem(string bookId, string bookTitle, string author, string genre) {

            var existingOrderForBook = OrderItems.Where(o => o.BookId == bookId).SingleOrDefault();

            if (existingOrderForBook == null)
            {
                var orderItem = new OrderItem(bookId, bookTitle, author, genre);
                _orderItems.Add(orderItem);
            }
        }

    }
}
