import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import { switchMap } from 'rxjs/operators';

import {User} from './models/user';
import {UserService} from './services/user.service';

@Component({
    moduleId: module.id,
    selector: 'user-podrobnosti',
    templateUrl: 'user-podrobnosti.component.html'
})
export class UserPodrobnostiComponent implements OnInit {
    user: User;

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
       this.route.params.pipe(
            switchMap((params: Params) => this.userService.getUser(+params['id'])))
            .subscribe(user => this.user = user);
    }

    nazaj(): void {
        this.location.back();
    }
    uredi(): void {
        this.router.navigate(['/uredi-uporabnika', this.user.userId]);
    }
}
