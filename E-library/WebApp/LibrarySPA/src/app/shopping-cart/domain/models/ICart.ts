import { ICartItem } from "./ICartItem";

export interface ICart {
    username: string;
    items: ICartItem[];
    totalItems: number;
}
