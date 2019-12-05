import { HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import ElementsJson from './categories.json';

@Injectable({
    providedIn: 'root'
})
export class TestHttpClient {

    constructor() { }

    get<T>(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T>;

    get<T>(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T>;

    get<T>(requestUrl, options?): Observable<HttpEvent<T>> | Observable<T> {

        return from(new Promise<HttpEvent<T>>((resolve) => {
            setTimeout(() => {
                const jsonToReturn = this.getJsonData(requestUrl);
                resolve(
                    jsonToReturn
                );
            }, 100);
        }));
    }

    private getJsonData(requestUrl): any {

        switch (requestUrl) {
            case 'elements':
                return ElementsJson;
            default:
                break;
        }
        return null;
    }
}
