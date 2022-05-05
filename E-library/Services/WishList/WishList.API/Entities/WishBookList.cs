using System;
using System.Collections.Generic;

namespace WishList.API.Entities
{
    public class WishBookList
    {
        public string Username { get; set; }
        public List<ListItem> WishedBooks { get; set; } = new List<ListItem>();

        public WishBookList()
        {

        }

        public WishBookList(string username)
        {
            Username = username ?? throw new ArgumentNullException(nameof(username));
        }
    
        
    
    }
}
