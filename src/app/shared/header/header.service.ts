import { Injectable, EventEmitter } from '@angular/core';

type Options = {
    element: any;
    keys: string;
}

@Injectable({ providedIn: 'root' })
export class HeaderService {

    saveEventEmitter: EventEmitter<void> = new EventEmitter<void>();
    canSaveEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
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
}