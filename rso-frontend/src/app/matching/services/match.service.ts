import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { of, from } from 'rxjs';

import {Match} from '../models/match';
import {User} from '../../user/models/user';
import {Apartment} from '../../apartment/models/apartment';
import {ApartmentService} from '../../apartment/services/apartment.service';
import {UserService} from '../../user/services/user.service';

import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class MatchService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private url = 'http://40.76.169.130/matching/v1/matching';


    constructor(
        private apartmentService: ApartmentService,
        private userService: UserService,
        private http: HttpClient
        ) {
    }

    getApartmentRecomendations(user: User): Observable<number[]> {
        const url = `${this.url}/apartment-recommendations`;
        return this.http.post<Number[]>(url, JSON.stringify(user), {headers: this.headers})
                         .pipe(catchError(this.handleError));
    }

    getUserRecomendations(apartment: Apartment): Observable<number[]> {
        const url = `${this.url}/user-recommendations`;
        return this.http.post<Number[]>(url, JSON.stringify(apartment), {headers: this.headers})
                         .pipe(catchError(this.handleError));
    }

    getMatches(entity: string, id: number): Observable<Match[]> {
        var url = this.url;
        if (entity == 'user') {
            var url = `${this.url}/filtered?filter=userId:EQ:${id} mutual:EQ:YES`;
        } else if (entity == 'apartment') {
            var url = `${this.url}/filtered?filter=apartmentId:EQ:${id} mutual:EQ:YES`;
        }
        return this.http.get<Match[]>(url)
                        .pipe(catchError(this.handleError));
    }

    matchUser(user: User, apartment: Apartment): Observable<User> {
        var tmp = new Match();
        tmp.apartmentId = apartment.id;
        tmp.userId = user.userId;
        tmp.location = apartment.location;
        tmp.initiator = "APT";
        tmp.mutual = "TBD"; 
        return this.http.post<Match>(this.url+'/match', JSON.stringify(tmp), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    matchApartment(user: User, apartment: Apartment): Observable<User> {
        var tmp = new Match();
        tmp.apartmentId = apartment.id;
        tmp.userId = user.userId;
        tmp.location = apartment.location;
        tmp.initiator = "USR";
        tmp.mutual = "TBD"; 
        return this.http.post<Match>(this.url+'/match', JSON.stringify(tmp), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    unmatch(match: Match): Observable<User> {
        match.mutual = "YES"; 
        return this.http.post<Match>(this.url+'/unmatch', JSON.stringify(match), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}

