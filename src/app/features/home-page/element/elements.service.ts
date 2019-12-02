import { EventEmitter, Injectable, ElementRef } from '@angular/core';
import { ElementType, HttpDefaultOptions } from 'src/app/app.constants';
import { TestHttpClient } from 'src/app/TestHttpClient/TestHttpClient.service';
import { map, mergeAll } from 'rxjs/operators';
import { of } from 'rxjs';

export const SCENE_HEADING_NEW_ELS = [ElementType.ACTION, ElementType.CHARACTER];
export const ACTION_NEW_ELS = [ElementType.SCENE_HEADING, ElementType.CHARACTER];
export const CHARACTER_NEW_ELS = [ElementType.DIALOG];
export const DIALOG_NEW_ELS = [ElementType.SCENE_HEADING, ElementType.ACTION, ElementType.CHARACTER];

@Injectable({ providedIn: 'root' })
export class ElementsService {

    scrollToElementChange: EventEmitter<any> = new EventEmitter<any>();

    allowedNewElements: string[];

    currentElementType: string;

    http: TestHttpClient;

    constructor(
        private testHttpClient: TestHttpClient
    ) {
        this.http = testHttpClient;
    }

    emitScrollToElementEmitterEvent(element) {
        this.scrollToElementChange.emit(element);
    }

    getScrollToElementEmitter(): EventEmitter<any> {
        return this.scrollToElementChange;
    }

    getElements() {

        return this.http.get<any[]>('elements', HttpDefaultOptions).pipe(
            map(categories => {
                return of(categories);
            }),
            mergeAll()
        );
    }

    setAllowedElements(elementType) {
        switch (elementType) {
            case ElementType.SCENE_HEADING:
                this.allowedNewElements = SCENE_HEADING_NEW_ELS;
                break;
            case ElementType.ACTION:
                this.allowedNewElements = ACTION_NEW_ELS;
                break;
            case ElementType.CHARACTER:
                this.allowedNewElements = CHARACTER_NEW_ELS;
                break;
            default:
                this.allowedNewElements = DIALOG_NEW_ELS;
        }
    }

    isValidNewElement(elementType) {
        return this.allowedNewElements.includes(elementType);
    }

    getAllowedElements() {
        return this.allowedNewElements;
    }

    canInsert(elementType, nextElementType) {
        return (elementType !== ElementType.DIALOG && nextElementType !== ElementType.DIALOG) &&
            (elementType !== ElementType.SCENE_HEADING && nextElementType !== ElementType.SCENE_HEADING) &&
            (elementType !== ElementType.ACTION && nextElementType !== ElementType.ACTION);
    }

    getDefaultText(elementType, onBlur?) {
        switch (elementType) {
            case ElementType.SCENE_HEADING:
                return onBlur ? 'EXT. UNKNOWN LOCATION' : 'INT. ';
            case ElementType.ACTION:
                return onBlur ? '😍 Silence...' : '';
            case ElementType.CHARACTER:
                return onBlur ? 'UNKNOWN' : '';
            default:
                return onBlur ? '... 😈' : '';
        }
    }

    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    getStartingText() {
        const elements: any = [
            {
                type: ElementType.SCENE_HEADING
            },
            {
                type: ElementType.ACTION
            },
            {
                type: ElementType.CHARACTER
            },
            {
                type: ElementType.DIALOG
            }
        ];

        elements.forEach(e => {
            e.id = this.guid();
            e.text = this.getDefaultText(e.type, true);
            e.inputClass = ElementType.getInputClass(e.type);
            e.typeClass = ElementType.getTypeClass(e.type);
            e.backspaceCount = 0;
        });

        return elements;
    }

    stripHtml(htmlString: string) {
        // const tmp = document.createElement("DIV");
        // tmp.innerHTML = htmlString;
        // return tmp.textContent || tmp.innerText || "";

        htmlString = htmlString.replace(/<\/p><p>/g, '\n');
        htmlString = htmlString.replace(/<p>/g, '');
        htmlString = htmlString.replace(/<\/p>/g, '');
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || '';
    }

    convertToHtml(text) {
        let formatedString = text.replace(/(?:\r\n|\r|\n)/g, '</p><p>');
        formatedString = formatedString.replace(/<p><\/p>/g, '');
        formatedString = '<p>' + formatedString + '</p>';
        return formatedString;
    }

}