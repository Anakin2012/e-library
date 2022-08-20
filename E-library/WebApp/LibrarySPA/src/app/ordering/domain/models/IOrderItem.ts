export interface IOrderItem {
    Id : Number;
    BookTitle : string;
    BookId : string;
    BookAuthor : string;
    BookGenre : string;
    Language : string;
    IsPremium : boolean;
    CoverImageFile : string;
}
//OrderItemDTO
//  int Id
//   string BookTitle { get; set; }
//           string BookId { get; set; }
//           string BookAuthor { get; set; }
//           string BookGenre { get; set; }
//           string Language { get; set; }
//           bool IsPremium { get; set; }
//           string CoverImageFile { get; set; }
