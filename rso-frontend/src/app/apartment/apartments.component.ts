import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Apartment} from './models/apartment';
import {ApartmentService} from './services/apartment.service';

@Component({
    moduleId: module.id,
    selector: 'vsi-apartments',
    templateUrl: 'apartments.component.html'
})
export class ApartmentsComponent implements OnInit {
    apartments: Apartment[];
    apartment: Apartment;

    constructor(private apartmentService: ApartmentService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getApartments();
    }

    getApartments(): void {
        this.apartmentService
            .getApartments()
            .subscribe(apartments => this.apartments = apartments);
    }

    naPodrobnosti(apartment: Apartment): void {
        this.apartment = apartment;
        this.router.navigate(['/stanovanja', this.apartment.id]);
    }

    delete(apartment: Apartment): void {
        this.apartmentService
            .delete(apartment.id)
            .subscribe(apartmentId => this.apartments = this.apartments.filter(u => u.id !== apartment.id));
    }

    dodaj(): void {
        this.router.navigate(['/dodaj-stanovanje']);
    }

}
