import { IWishlistItem } from "./wishlistitem";

export interface IWish {
    username : string;
    wishedBooks : IWishlistItem[];
}