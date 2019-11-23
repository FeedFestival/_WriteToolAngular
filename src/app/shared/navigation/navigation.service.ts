import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigationService {

    editingStateChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(

    ) {

    }

    emitEditStateEvent(editState) {
        this.editingStateChange.emit(editState);
    }

    getEditStateEmitter(): EventEmitter<string> {
        return this.editingStateChange;
    }

}