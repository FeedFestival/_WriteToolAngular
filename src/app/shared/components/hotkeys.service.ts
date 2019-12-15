import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, EventEmitter } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NavigationService } from '../navigation/navigation.service';
import { EditState, Key, ElementType } from 'src/app/app.constants';
import { ElementsService } from 'src/app/features/home-page/element/elements.service';

type Options = {
    element: any;
    keys: string;
}

@Injectable({ providedIn: 'root' })
export class Hotkeys {

    private controlSHotkey: EventEmitter<void> = new EventEmitter<void>();

    defaults: Partial<Options> = {
        element: this.document
    }

    editState: string;

    constructor(
        private elementsService: ElementsService,
        private navigationService: NavigationService,
        private eventManager: EventManager,
        @Inject(DOCUMENT) private document: Document
    ) {

        document.addEventListener('keydown', (e) => {
            // console.log("TCL: Hotkeys -> e", e)
            if (this.isTabKey(e)) {
                console.log(e);
                e.preventDefault();
            }

            if (this.isControlSHotkey(e)) {
                e.preventDefault();
                this.controlSHotkey.emit();
            }

        });

        navigationService.getEditStateEmitter()
            .subscribe((editState) => {
                this.editState = editState;
            });
    }

    onControlSHotkey() {
        return this.controlSHotkey;
    }

    addShortcut(options: Partial<Options>) {
        const merged = { ...this.defaults, ...options };
        const event = `keydown.${merged.keys}`;

        return new Observable(observer => {
            const handler = (e) => {

                // console.log("TCL: Hotkeys -> handler -> e.key", e.key);
                // console.log('Hotkeys -> ' + e.key + '(' + this.editState + ')');

                if (this.hasAccessToKey(e.key, this.editState) === false) {
                    return;
                }

                if (this.editState === EditState.TEXT && e.key === Key.Backspace) {
                    observer.next(e);
                    return;
                }

                console.log("TCL: Hotkeys -> handler -> e.key", e.key);

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
                    keyCode === Key.Enter ||
                    keyCode === Key.Backspace ||
                    //
                    keyCode === Key.Z ||
                    keyCode === Key.Y
                ) {
                    return true;
                }
                return false;
            case EditState.NEW:
                if (keyCode === Key.S ||
                    keyCode === Key.A ||
                    keyCode === Key.C ||
                    keyCode === Key.D ||
                    keyCode === Key.P ||
                    keyCode === Key.V ||
                    keyCode === Key.H ||
                    keyCode === Key.Slash ||
                    keyCode === Key.Escape ||
                    // allow arrows to cancel this state
                    keyCode === Key.ArrowUp ||
                    keyCode === Key.ArrowDown
                ) {
                    return true;
                }
                return false;
            case EditState.TEXT:
                if (keyCode === Key.Backspace ||
                    keyCode === Key.Escape ||
                    (keyCode === Key.Enter &&
                        (this.elementsService.currentElementType === ElementType.SCENE_HEADING ||
                            this.elementsService.currentElementType === ElementType.CHARACTER))
                ) {
                    return true;
                }
                return false;
            default:
                break;
        }
    }

    private isControlSHotkey(e): boolean {
        return e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey);
    }

    private isTabKey(e) {
        return e.keyCode == 9 || e.which == 9;
    }

}