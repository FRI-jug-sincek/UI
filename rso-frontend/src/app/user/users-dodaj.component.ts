import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {User} from './models/user';
import {UserService} from './services/user.service';

@Component({
    moduleId: module.id,
    selector: 'dodaj-users',
    templateUrl: 'users-dodaj.component.html'
})
export class UsersDodajComponent {
    user: User = new User;

    constructor(private userService: UserService,
                private router: Router) {
    }

    submitForm(): void {
        this.userService.create(this.user)
        .subscribe(() => this.router.navigate(['/uporabniki']));
    }

    nazaj(): void {
        this.router.navigate(['/uporabniki']);
    }

}
