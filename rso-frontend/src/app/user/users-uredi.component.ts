import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';

import {User} from './models/user';
import {UserService} from './services/user.service';

@Component({
    moduleId: module.id,
    selector: 'uredi-users',
    templateUrl: 'users-uredi.component.html'
})
export class UsersUrediComponent {
    user: User;

    constructor(private userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
       this.route.params.pipe(
            switchMap((params: Params) => this.userService.getUser(+params['id'])))
            .subscribe(user => this.user = user);
    }
    submitForm(): void {
        this.userService.update(this.user)
        .subscribe(() => this.router.navigate(['/uporabniki']));
    }

    nazaj(): void {
        this.router.navigate(['/uporabniki']);
    }

}
