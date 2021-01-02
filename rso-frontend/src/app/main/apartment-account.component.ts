import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import { switchMap } from 'rxjs/operators';

import {Image} from '../image/models/image';
import {ImageService} from '../image/services/image.service';

import {Apartment} from '../apartment/models/apartment';
import {ApartmentService} from '../apartment/services/apartment.service';

@Component({
    moduleId: module.id,
    selector: 'apartment-account',
    templateUrl: 'apartment-account.component.html'
})
export class ApartmentAccountComponent implements OnInit {
    apartment: Apartment;

    constructor(private imageService: ImageService,
                private apartmentService: ApartmentService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap((params: Params) => this.apartmentService.getApartment(+params['id'])))
            .subscribe(ap => this.apartment = ap);
    }

    editApartment(): void {
        this.router.navigate(['/edit-apartment/', this.apartment.id]);
    }

    pregledSlik(): void {
        this.router.navigate(['/images-overview/apartment/', this.apartment.id]);
    }

    backHome(): void {
        this.router.navigate(['/home/apartment/', this.apartment.id]);
    }
}
