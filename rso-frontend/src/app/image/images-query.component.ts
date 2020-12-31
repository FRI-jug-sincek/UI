import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Image} from './models/image';
import {ImageService} from './services/image.service';

@Component({
    moduleId: module.id,
    selector: 'images-query',
    templateUrl: 'images-query.component.html'
})
export class ImagesQueryComponent implements OnInit {
    images: Image[];
    image: Image;

    constructor(private imageService: ImageService,
                private router: Router,
                private location: Location,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.image = new Image;
        this.image.foreignKey = this.route.snapshot.params.key;
        this.image.entity = this.route.snapshot.params.entity;

        this.getImages();
    }

    getImages(): void {
        this.imageService
            .getImagesByEntityAndKey('user', 8)
            .subscribe(images => this.images = images);
    }

    naPodrobnosti(image: Image): void {
        this.image = image;
        this.router.navigate(['/slike', this.image.imageId]);
    }

    delete(image: Image): void {
        this.imageService
            .delete(image.imageId)
            .subscribe(imageId => this.images = this.images.filter(u => u.imageId !== image.imageId));
    }

    submitForm(): void {
        this.imageService.create(this.image)
        .subscribe(() => this.getImages());

        this.image.uri = null;
    }

    nazaj(): void {
        // this.router.navigate(['/slike']);
        this.location.back();
    }

}
