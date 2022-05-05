namespace ShoppingCart.API.Entities
{
    internal class CartItem
    {
        public string bookId { get; set; }
        public string bookName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

    }
}