import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Image} from '../models/image';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ImageService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private url = 'http://localhost:8080/v1/images';

    constructor(private http: HttpClient) {
    }

    getImages(): Observable<Image[]> {
        return this.http.get<Image[]>(this.url)
                        .pipe(catchError(this.handleError));
    }

    getImagesByEntityAndKey(entity : string, key: number): Observable<Image[]> {
        const url = `${this.url}/filtered?order=id ASC&filter=entity:EQ:${entity} foreignKey:EQ:${key}`;

        return this.http.get<Image[]>(url)
                        .pipe(catchError(this.handleError));
    }

    getImage(id: number): Observable<Image> {
        const url = `${this.url}/${id}`;
        return this.http.get<Image>(url)
                        .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<number> {
        const url = `${this.url}/${id}`;
        return this.http.delete<number>(url, {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    create(image: Image): Observable<Image> {
        return this.http.post<Image>(this.url, JSON.stringify(image), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    update(image: Image): Observable<Image> {
        return this.http.put<Image>(this.url +"/"+ image.imageId, JSON.stringify(image), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}

