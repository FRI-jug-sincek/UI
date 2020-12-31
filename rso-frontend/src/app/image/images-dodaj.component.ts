import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {Image} from './models/image';
import {ImageService} from './services/image.service';

@Component({
    moduleId: module.id,
    selector: 'dodaj-images',
    templateUrl: 'images-dodaj.component.html'
})
export class ImagesDodajComponent {
    image: Image = new Image;

    constructor(private imageService: ImageService,
                private router: Router,
                private location: Location) {
    }

    submitForm(): void {
        this.imageService.create(this.image)
        .subscribe(() => this.location.back());
    }

    nazaj(): void {
        // this.router.navigate(['/slike']);
        this.location.back();
    }

}
