import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllMembersFacadeService } from '../../identity/domain/application-services/allmembers-facade.service';
import { IUser } from '../../identity/domain/models/user';

@Component({
    selector: 'app-feature-show-users',
    templateUrl: './feature-show-users.component.html',
    styleUrls: ['./feature-show-users.component.css']
})
export class FeatureShowUsersComponent implements OnInit {

    allUsers: IUser[] = [];
    subscription: Subscription;
    constructor(private usersService: AllMembersFacadeService) { }

    ngOnInit(): void {
        this.getAllUsers();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private getAllUsers() {
        this.subscription = this.usersService.getAllMembers().subscribe((users) => {
            console.log(users);
            this.allUsers = users;
        });
    }

}
