import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Image} from './models/image';
import {ImageService} from './services/image.service';

@Component({
    moduleId: module.id,
    selector: 'vsi-images',
    templateUrl: 'images.component.html'
})
export class ImagesComponent implements OnInit {
    images: Image[];
    image: Image;

    constructor(private imageService: ImageService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getImages();
    }

    getImages(): void {
        this.imageService
            .getImages()
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

    dodaj(): void {
        this.router.navigate(['/dodaj-sliko']);
    }

}
