import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Chat} from '../models/chat';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ChatService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    // private url = 'http://localhost:8080/v1/chat';
    private url = 'http://40.76.169.130/chat/v1/chat';


    constructor(private http: HttpClient) {
    }

    getChats(): Observable<Chat[]> {
        return this.http.get<Chat[]>(this.url)
                        .pipe(catchError(this.handleError));
    }

    getChat(id: number): Observable<Chat> {
        const url = `${this.url}/${id}`;
        return this.http.get<Chat>(url)
                        .pipe(catchError(this.handleError));
    }

    getChatByApartment(id: number): Observable<Chat[]> {
        const url = `${this.url}/filtered?order=id ASC&filter=apartmentId:EQ:${id}`;

        return this.http.get<Chat[]>(url)
                        .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<number> {
        const url = `${this.url}/${id}`;
        return this.http.delete<number>(url, {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    create(chat: Chat): Observable<Chat> {
        return this.http.post<Chat>(this.url, JSON.stringify(chat), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    update(chat: Chat): Observable<Chat> {
        return this.http.put<Chat>(this.url +"/"+ chat.id, JSON.stringify(chat), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}

