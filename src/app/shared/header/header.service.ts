import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WriteToolUtils } from 'src/app/features/home-page/story.utils';

type Options = {
    element: any;
    keys: string;
}

@Injectable({ providedIn: 'root' })
export class HeaderService {

    saveEventEmitter: EventEmitter<void> = new EventEmitter<void>();
    canSaveEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private http: HttpClient
    ) {
    }

    emitSaveEvent() {
        this.saveEventEmitter.emit();
    }

    getSaveEvent(): EventEmitter<any> {
        return this.saveEventEmitter;
    }

    emitCanSaveEvent(canSave: boolean = true) {
        this.canSaveEventEmitter.emit(canSave);
    }

    getCanSaveEvent(): EventEmitter<boolean> {
        return this.canSaveEventEmitter;
    }

    saveUser(user): Observable<any> {
        const requestOptions: Object = {
            ...HttpDefaultOptions,
            responseType: 'text'
        }
        return this.http.post<any>(WriteToolUtils.baseRequestUrl() + 'UserService/Register.php', user, requestOptions);
    }
}

export const HttpDefaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    // 'Origin': 'http://localhost:4200'
    // 'UserId': '1445866905885',
    // 'SessionID': '9F5A5548743EA42C69D2685E41FCB50E',
    // 'JSESSIONID': 'C57B67E0039E7AF4BDA8E2002B54EE4A'
    //  Cookie: JSESSIONID=C57B67E0039E7AF4BDA8E2002B54EE4A; UserID=1531381765430; SessionID=9F5A5548743EA42C69D2685E41FCB50E
});

export const HttpDefaultOptions = {
    headers: HttpDefaultHeaders,
    withCredentials: false,
    // useXDomain: true,
    'cache': false,
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'If-Modified-Since': '0',
    // 'responseType': 'text'
};
