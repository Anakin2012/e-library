import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { WishListService } from "../infrastructure/wishlist-service";
import { IWish } from "../models/wishlist";
import { IWishlistItem } from "../models/wishlistitem";

@Injectable({
    providedIn: 'root'
})

export class WishListServiceFacade {

private wishListService;
constructor(wishListService : WishListService){}

public GetList(username:string) : Observable<IWish>{
    return this.wishListService.GetList(username);
}

public GetRecommendationsByAuthor(username: string) : Observable<IWishlistItem[]>{
    return this.wishListService.GetRecommendationsByAuthor(username);
}

public GetRecommendationsByGenre(username: string):Observable<IWishlistItem[]>{
    return this.wishListService.GetRecommendationsByGenre(username);
}

public AddToWishList(username : string, bookId:string): Observable<IWish>{
    return this.wishListService.AddToWishList(username,bookId);
}
public DeleteList(username : string): void{
    return this.wishListService.DeleteList(username);
}

public UpdateList(list : Object) : Observable<Object>{
    return this.wishListService.UpdateList(list);
}

public RemoveFromWishlist(username : string, bookId : string) : Observable<IWishlistItem[]>{
    return this.wishListService.RemoveFromWishlist(username,bookId);
}
}
