import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import { switchMap } from 'rxjs/operators';

import {Image} from '../image/models/image';
import {ImageService} from '../image/services/image.service';

import {User} from '../user/models/user';
import {UserService} from '../user/services/user.service';
import {Apartment} from '../apartment/models/apartment';
import {ApartmentService} from '../apartment/services/apartment.service';
import {MatchService} from '../matching/services/match.service';

interface customType {
    id: number,
    url: string
}

@Component({
    moduleId: module.id,
    selector: 'main',
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {
    user: User;
    apartment: Apartment;
    isUser: boolean;
    
    users: User[] = [];
    apartments: Apartment[] = [];
    apartmentRecIds: number[];
    userRecIds: number[];
    apartmentImages: customType[] = [];
    userImages: customType[] = [];

    constructor(private imageService: ImageService,
                private userService: UserService,
                private matchService: MatchService,
                private apartmentService: ApartmentService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
        if (this.route.snapshot.params.entity == 'user') {
            this.isUser = true;
            this.route.params.pipe(
                switchMap((params: Params) => this.userService.getUser(+params['id'])))
                .subscribe(user => {
                    this.user = user; 
                    this.getApartmentRecomendations(user);
                });
        } else if (this.route.snapshot.params.entity == 'apartment') {
            this.isUser = false;
            this.route.params.pipe(
                switchMap((params: Params) => this.apartmentService.getApartment(+params['id'])))
                .subscribe(ap => {
                    this.apartment = ap;
                    this.getUserRecomendations(ap);
                });
        }     
    }

    getApartmentRecomendations(user: User) {
        this.route.params.pipe(
            switchMap((params: Params) => this.matchService.getApartmentRecomendations(user)))
            .subscribe(ids => {
                this.apartmentRecIds = ids;
                this.setApartmentDetails(ids);
                this.setApartmentImages(ids);
            });
    }

    setApartmentImages(ids : number[]) {
        ids.forEach(id => {
            this.imageService.getImagesByEntityAndKey("apartment", id).subscribe(im => {
                if (im.length > 0) {
                    this.apartmentImages.push({
                        id: id,
                        url: im[0].uri
                    });
                } else {
                    this.apartmentImages.push({
                        id: id,
                        url: "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png"
                    });
                }
            })
        });
    }

    setApartmentDetails(ids : number[]) {
        ids.forEach(id => {
            this.apartmentService.getApartment(id).subscribe(ap => {
                this.apartments.push(ap);
            })
        });
    }

    getUserRecomendations(apartment: Apartment) {
        this.route.params.pipe(
            switchMap((params: Params) => this.matchService.getUserRecomendations(apartment)))
            .subscribe(ids => {
                this.userRecIds = ids;
                this.setUserDetails(ids);
                this.setUserImages(ids);
            });
    }

    setUserImages(ids : number[]) {
        ids.forEach(id => {
            this.imageService.getImagesByEntityAndKey("user", id).subscribe(im => {
                if (im.length > 0) {
                    this.userImages.push({
                        id: id,
                        url: im[0].uri
                    });
                } else {
                    this.userImages.push({
                        id: id,
                        url: "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png"
                    });
                }
            })
        });
    }

    setUserDetails(ids : number[]) {
        ids.forEach(id => {
            this.userService.getUser(id).subscribe(user => {
                this.users.push(user);
            })
        });
    }

    account(): void {
        if (this.isUser){
            this.router.navigate(['/user-account', this.user.userId]);
        } else {
            this.router.navigate(['/apartment-account', this.apartment.id]);
        }
    }
    matches(): void {
        if (this.isUser){
            this.router.navigate(['/matches/user', this.user.userId]);
        } else {
            this.router.navigate(['/matches/apartment', this.apartment.id]);
        }
    }

    i=0;
    getSlide() {
        if (this.isUser) {
            var id = this.apartments[this.i].id;
            var apt = this.apartmentImages.find(f => f.id == id);
            return apt ? apt.url : "";
        } else {
            var id = this.users[this.i].userId;
            var user = this.userImages.find(f => f.id == id);
            return user ? user.url : "";
        }
    }
    getDetails() {
        if (this.isUser) {
            return this.apartments[this.i];
        } else {
            return this.users[this.i];
        }
    }
    getPrev() {
        this.i = this.i===0 ? 0 : this.i - 1;
    }
    getNext() {
        if (this.isUser) {
            this.i = this.i===(this.apartments.length-1) ? this.i: this.i + 1;
        } else {
            this.i = this.i===(this.users.length-1) ? this.i : this.i + 1;
        }
    }

    yes() {
        if(this.isUser){
            this.matchService.matchApartment(this.user, this.apartments[this.i])
            .subscribe(() =>  this.getNext());
        } else {
            this.matchService.matchUser(this.users[this.i], this.apartment)
            .subscribe(() =>  this.getNext());
        }
    }
}
