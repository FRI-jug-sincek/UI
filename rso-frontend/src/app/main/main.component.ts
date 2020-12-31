import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import { switchMap } from 'rxjs/operators';

import {Image} from '../image/models/image';
import {ImageService} from '../image/services/image.service';

import {User} from '../user/models/user';
import {UserService} from '../user/services/user.service';

@Component({
    moduleId: module.id,
    selector: 'main',
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {
    user: User;

    constructor(private imageService: ImageService,
                private userService: UserService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap((params: Params) => this.userService.getUser(+params['id'])))
            .subscribe(user => this.user = user);
    }

    account(): void {
        this.router.navigate(['/account', this.user.userId]);
    }
    matches(): void {
        this.router.navigate(['/matches', this.user.userId]);
    }
}
