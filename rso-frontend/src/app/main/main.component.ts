import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import { switchMap } from 'rxjs/operators';

import {Image} from '../image/models/image';
import {ImageService} from '../image/services/image.service';

import {User} from '../user/models/user';
import {UserService} from '../user/services/user.service';

import {Apartment} from '../apartment/models/apartment';
import {ApartmentService} from '../apartment/services/apartment.service';

@Component({
    moduleId: module.id,
    selector: 'main',
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {
    user: User;
    apartment: Apartment;
    isUser: boolean;

    constructor(private imageService: ImageService,
                private userService: UserService,
                private apartmentService: ApartmentService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
        if (this.route.snapshot.params.entity == "user") {
            this.route.params.pipe(
                switchMap((params: Params) => this.userService.getUser(+params['id'])))
                .subscribe(user => this.user = user);
            this.isUser = true;
        } else if (this.route.snapshot.params.entity == "apartment") {
            this.route.params.pipe(
                switchMap((params: Params) => this.apartmentService.getApartment(+params['id'])))
                .subscribe(ap => this.apartment = ap);
            this.isUser = false;
        }
        
    }

    account(): void {
        if (this.isUser){
            this.router.navigate(['/user-account', this.user.userId]);
        } else {
            this.router.navigate(['/apartment-account', this.apartment.id]);
        }
    }
    matches(): void {
        if (this.isUser){
            this.router.navigate(['/matches', this.user.userId]);
        } else {
            this.router.navigate(['/matches', this.apartment.id]);
        }
    }
}
