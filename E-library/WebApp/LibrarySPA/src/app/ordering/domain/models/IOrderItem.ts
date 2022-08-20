export interface IOrderItem {
    id : Number;
    bookTitle : string;
    bookId : string;
    bookAuthor : string;
    bookGenre : string;
    language : string;
    isPremium : boolean;
    coverImageFile : string;
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
