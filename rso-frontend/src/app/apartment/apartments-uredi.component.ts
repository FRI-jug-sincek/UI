import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';

import {Apartment} from './models/apartment';
import {ApartmentService} from './services/apartment.service';
import { User } from '../user/models/user';
import { UserService } from '../user/services/user.service';

@Component({
    moduleId: module.id,
    selector: 'uredi-apartments',
    templateUrl: 'apartments-uredi.component.html'
})
export class ApartmentsUrediComponent {
    apartment: Apartment;
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

        this.route.params.pipe(
                switchMap((params: Params) => this.apartmentService.getApartment(+params['id'])))
                .subscribe(apartment => this.apartment = apartment);
    }
    submitForm(): void {
        this.apartmentService.update(this.apartment)
        .subscribe(() => this.location.back());
    }

    nazaj(): void {
        this.location.back();
        // this.router.navigate(['/apartments']);
    }

}
