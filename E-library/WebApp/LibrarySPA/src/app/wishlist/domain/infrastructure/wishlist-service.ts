import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { IWishlistItem } from "../models/wishlistitem";
import { IWish } from "../models/wishlist";
@Injectable({
    providedIn: 'root'
})
export class WishListService{
private readonly url: string = 'http://localhost:8002/api/v1/WishList';

constructor(private http: HttpClient){}
public GetList(username: string):Observable<IWish>{
    return this.http.get<IWish>(`${this.url}/GetList/${username}`);
}

public GetRecommendationsByAuthor(username: string):Observable<IWishlistItem[]>{
    return this.http.get<IWishlistItem[]>(`${this.url}/recommendByAuthor/${username}`);
}

public AddToWishList(username : string, bookId:string): Observable<IWish>{
    return this.http.put<IWish>(`http://localhost:8002/addBookToWishList/${username}/${bookId}`, bookId);
}


public GetRecommendationsByGenre(username: string):Observable<IWishlistItem[]>{
    return this.http.get<IWishlistItem[]>(`${this.url}/recommendByGenre/${username}`);
}

public DeleteList(username : string) : void {
    this.http.delete(`${this.url}/${username}`);
}

public RemoveFromWishlist(username : string, bookId) : Observable<IWish>{
    return this.http.put<IWish>(`${this.url}/RemoveItemFromWishlist/${username}/${bookId}`, bookId);
}
}