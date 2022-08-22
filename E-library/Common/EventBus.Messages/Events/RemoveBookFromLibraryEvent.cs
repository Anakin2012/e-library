using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.Messages.Events
{
    public class RemoveBookFromLibraryEvent
    {

        public string  BookId { get; set; }

        public RemoveBookFromLibraryEvent(string bookId) {
            this.BookId = bookId;
        }
    }
}
