import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Apartment} from '../models/apartment';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ApartmentService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private url = 'http://localhost:8080/v1/apartments';

    constructor(private http: HttpClient) {
    }

    getApartments(): Observable<Apartment[]> {
        return this.http.get<Apartment[]>(this.url)
                        .pipe(catchError(this.handleError));
    }

    getApartment(id: number): Observable<Apartment> {
        const url = `${this.url}/${id}`;
        return this.http.get<Apartment>(url)
                        .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<number> {
        const url = `${this.url}/${id}`;
        return this.http.delete<number>(url, {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    create(apartment: Apartment): Observable<Apartment> {
        return this.http.post<Apartment>(this.url, JSON.stringify(apartment), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    update(apartment: Apartment): Observable<Apartment> {
        return this.http.put<Apartment>(this.url +"/"+ apartment.id, JSON.stringify(apartment), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}

