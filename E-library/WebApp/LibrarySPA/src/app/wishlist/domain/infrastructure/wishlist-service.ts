import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { IWishlistItem } from "../models/wishlistitem";

@Injectable({
    providedIn: 'root'
})
export class WishListService{
private readonly url: string = 'http://localhost:8002/api/v1/Wishlist';

constructor(private http: HttpClient){}
public GetList(username: string):Observable<IWishlistItem[]>{
    return this.http.get<IWishlistItem[]>(`${this.url}/GetList/${username}`);
}

public GetRecommendationsByAuthor(username: string):Observable<IWishlistItem[]>{
    return this.http.get<IWishlistItem[]>(`${this.url}/recommendByAuthor/${username}`);
}

public AddToWishList(username : string, bookId:string): void{
    this.http.put(`${this.url}/addBookToWishList/${username}/${bookId}`, bookId);
}


public GetRecommendationsByGenre(username: string):Observable<IWishlistItem[]>{
    return this.http.get<IWishlistItem[]>(`${this.url}/recommendByGenre/${username}`);
}

public DeleteList(username : string) : void {
    this.http.delete(`${this.url}/${username}`);
}

public UpdateList(list : Object) : Observable<Object>{
    return this.http.put('${this.url}/UpdateList', list);
}
}