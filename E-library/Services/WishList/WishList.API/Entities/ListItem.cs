namespace WishList.API.Entities
{
    public class ListItem
    {

        public string BookId { get; set; }
        public string BookTitle { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public string CoverImageFile { get; set; } // putanja do slike
        public bool IsAvailable { get; set; } // da li je knjiga dostupna za iznajmljivanje 
        public bool IsPremium { get; set; } // ako je true, dostupna samo premium clanovima 


    }

    }
 
