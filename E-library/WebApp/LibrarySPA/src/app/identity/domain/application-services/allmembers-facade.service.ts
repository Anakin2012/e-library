import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AllMembersService } from '../infrastructure/allmembers.service';
import { IUser } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AllMembersFacadeService {

    constructor(private allMembersService: AllMembersService) { }

    public getAllMembers(): Observable<IUser[]> {
        return this.allMembersService.getAllMembers();
    }


}
