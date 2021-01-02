import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import { switchMap } from 'rxjs/operators';

import {Image} from './models/image';
import {ImageService} from './services/image.service';

@Component({
    moduleId: module.id,
    selector: 'image-podrobnosti',
    templateUrl: 'image-podrobnosti.component.html'
})
export class ImagePodrobnostiComponent implements OnInit {
    image: Image;

    constructor(private imageService: ImageService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
       this.route.params.pipe(
            switchMap((params: Params) => this.imageService.getImage(+params['id'])))
            .subscribe(image => this.image = image);
    }

    nazaj(): void {
        this.location.back();
    }
    uredi(): void {
        this.router.navigate(['/edit-image', this.image.imageId]);
    }
}
