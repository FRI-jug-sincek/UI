import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from './models/user';
import {UserService} from './services/user.service';

@Component({
    moduleId: module.id,
    selector: 'vsi-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
    users: User[];
    user: User;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getUporabniki();
    }

    getUporabniki(): void {
        this.userService
            .getUsers()
            .subscribe(users => this.users = users);
    }

    naPodrobnosti(user: User): void {
        this.user = user;
        this.router.navigate(['/users', this.user.userId]);
    }

    delete(user: User): void {
        this.userService
            .delete(user.userId)
            .subscribe(uporabnikId => this.users = this.users.filter(u => u.userId !== user.userId));
    }

    dodajUporabnika(): void {
        this.router.navigate(['/add-user']);
    }

}
