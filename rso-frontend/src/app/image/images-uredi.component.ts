import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';

import {Image} from './models/image';
import {ImageService} from './services/image.service';

@Component({
    moduleId: module.id,
    selector: 'uredi-images',
    templateUrl: 'images-uredi.component.html'
})
export class ImagesUrediComponent {
    image: Image;

    constructor(private imageService: ImageService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
       this.route.params.pipe(
            switchMap((params: Params) => this.imageService.getImage(+params['id'])))
            .subscribe(image => this.image = image);
    }
    submitForm(): void {
        this.imageService.update(this.image)
        .subscribe(() => this.location.back());
    }

    nazaj(): void {
        // this.router.navigate(['/slike']);
        this.location.back();
    }

}
