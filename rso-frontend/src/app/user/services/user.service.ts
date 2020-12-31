import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../models/user';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    // private url = 'http://localhost:8080/v1/users';
    private url = 'http://40.76.169.130/users/v1/users';


    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url)
                        .pipe(catchError(this.handleError));
    }

    getUser(id: number): Observable<User> {
        const url = `${this.url}/${id}`;
        return this.http.get<User>(url)
                        .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<number> {
        const url = `${this.url}/${id}`;
        return this.http.delete<number>(url, {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    create(uporabnik: User): Observable<User> {
        return this.http.post<User>(this.url, JSON.stringify(uporabnik), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    update(uporabnik: User): Observable<User> {
        return this.http.put<User>(this.url +"/"+ uporabnik.userId, JSON.stringify(uporabnik), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}

