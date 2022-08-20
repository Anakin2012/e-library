import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';


@Injectable({
    providedIn: 'root'
})
export class AllMembersService {

    constructor(private httpClient: HttpClient) { }


    public getAllMembers(): Observable<IUser[]> {
        return this.httpClient.get<IUser[]>(`http://localhost:4000/api/v1/Administrator/GetAllMembers`);
    }

}