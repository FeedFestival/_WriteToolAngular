import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NavigationService } from '../navigation/navigation.service';
import { EditState, Key } from 'src/app/app.constants';

type Options = {
    element: any;
    keys: string;
}

@Injectable({ providedIn: 'root' })
export class Hotkeys {

    defaults: Partial<Options> = {
        element: this.document
    }

    editState: string;

    constructor(
        private navigationService: NavigationService,
        private eventManager: EventManager,
        @Inject(DOCUMENT) private document: Document
    ) {

        navigationService.getEditStateEmitter()
            .subscribe((editState) => {
                this.editState = editState;
            });
    }

    addShortcut(options: Partial<Options>) {
        const merged = { ...this.defaults, ...options };
        const event = `keydown.${merged.keys}`;

        return new Observable(observer => {
            const handler = (e) => {

                // console.log('Hotkeys -> ' + e.key + '(' + this.editState + ')');

                if (this.hasAccessToKey(e.key, this.editState) === false) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                observer.next(e);
            };

            const dispose = this.eventManager.addEventListener(
                merged.element, event, handler
            );

            return () => {
                dispose();
            };
        })
    }

    private hasAccessToKey(keyCode, editState) {
        switch (editState) {
            case EditState.MAIN:
                if (keyCode === Key.ArrowUp ||
                    keyCode === Key.ArrowDown ||
                    keyCode === Key.Tab ||
                    keyCode === Key.Enter) {
                    return true;
                }
                return false;
            case EditState.NEW:
                if (keyCode === Key.S ||
                    keyCode === Key.A ||
                    keyCode === Key.C ||
                    keyCode === Key.D ||
                    keyCode === Key.Escape ||
                    // allow arrows to cancel this state
                    keyCode === Key.ArrowUp ||
                    keyCode === Key.ArrowDown
                ) {
                    return true;
                }
                return false;
            case EditState.TEXT:
                if (keyCode === Key.Escape) {
                    return true;
                }
                return false;
            default:
                break;
        }
    }

}