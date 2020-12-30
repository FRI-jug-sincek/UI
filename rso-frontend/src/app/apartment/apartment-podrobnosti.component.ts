import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import { switchMap } from 'rxjs/operators';

import {Apartment} from './models/apartment';
import {ApartmentService} from './services/apartment.service';

@Component({
    moduleId: module.id,
    selector: 'apartment-podrobnosti',
    templateUrl: 'apartment-podrobnosti.component.html'
})
export class ApartmentPodrobnostiComponent implements OnInit {
    apartment: Apartment;

    constructor(private apartmentService: ApartmentService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
       this.route.params.pipe(
            switchMap((params: Params) => this.apartmentService.getApartment(+params['id'])))
            .subscribe(apartment => this.apartment = apartment);
    }

    nazaj(): void {
        this.location.back();
    }
    uredi(): void {
        this.router.navigate(['/uredi-stanovanje', this.apartment.id]);
    }
}
