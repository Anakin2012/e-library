import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { WishListService } from "../infrastructure/wishlist-service";
import { IWishlistItem } from "../models/wishlistitem";

@Injectable({
    providedIn: 'root'
})

export class WishListServiceFacade {

private wishListService;
constructor(wishListService : WishListService){}

public GetList(username:string) : Observable<IWishlistItem[]>{
    return this.wishListService.GetList(username);
}

public GetRecommendationsByAuthor(username: string) : Observable<IWishlistItem[]>{
    return this.wishListService.GetRecommendationsByAuthor(username);
}

public GetRecommendationsByGenre(username: string):Observable<IWishlistItem[]>{
    return this.wishListService.GetRecommendationsByGenre(username);
}

public AddToWishList(username : string, bookId:string): void{
    return this.wishListService.AddToWishList(username,bookId);
}
public DeleteList(username : string): void{
    return this.wishListService.DeleteList(username);
}
}
