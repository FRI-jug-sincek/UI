import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import { switchMap } from 'rxjs/operators';

import {Apartment} from './models/apartment';
import {ApartmentService} from './services/apartment.service';

import { User } from '../user/models/user';
import { UserService } from '../user/services/user.service';

@Component({
    moduleId: module.id,
    selector: 'dodaj-apartments',
    templateUrl: 'apartments-dodaj.component.html'
})
export class ApartmentsDodajComponent {
    apartment: Apartment = new Apartment;
    users: User[];

    constructor(
        private apartmentService: ApartmentService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location) {
    }

    ngOnInit(): void {
        this.userService
            .getUsers()
            .subscribe(users => this.users = users);
    }

    submitForm(): void {
        this.apartmentService.create(this.apartment)
        .subscribe(() => this.router.navigate(['/stanovanja']));
    }

    nazaj(): void {
        this.router.navigate(['/stanovanja']);
    }

}
