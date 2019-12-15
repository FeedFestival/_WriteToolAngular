import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OnResizeService {

    resizeEvent: EventEmitter<string> = new EventEmitter<string>();

    getResizeEvent() {
        return this.resizeEvent;
    }

    emitResizeEvent(resizeType) {
        console.log(resizeType);
        setTimeout(() => {
            this.resizeEvent.emit(resizeType);
        });
    }
}