import { EventEmitter, Injectable, ElementRef } from '@angular/core';
import { ElementType } from 'src/app/app.constants';

export const SCENE_HEADING_NEW_ELS = [ElementType.ACTION, ElementType.CHARACTER];
export const ACTION_NEW_ELS = [ElementType.SCENE_HEADING, ElementType.CHARACTER];
export const CHARACTER_NEW_ELS = [ElementType.DIALOG];
export const DIALOG_NEW_ELS = [ElementType.SCENE_HEADING, ElementType.ACTION, ElementType.CHARACTER];

@Injectable({ providedIn: 'root' })
export class ElementsService {

    scrollToElementChange: EventEmitter<any> = new EventEmitter<any>();

    allowedNewElements: string[];

    currentElementType: string;

    undos: any[];
    undosIndex: number;

    constructor(
    ) {

    }

    emitScrollToElementEmitterEvent(element) {
        this.scrollToElementChange.emit(element);
    }

    getScrollToElementEmitter(): EventEmitter<any> {
        return this.scrollToElementChange;
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
                return onBlur ? 'Silence...' : '';
            case ElementType.CHARACTER:
                return onBlur ? 'UNKNOWN' : '';
            default:
                return onBlur ? '...' : '';
        }
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
            },
            //
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },
        ];

        let id = 1;
        elements.forEach(e => {
            e.id = id;
            e.text = this.getDefaultText(e.type, true);
            e.inputClass = ElementType.getInputClass(e.type);
            e.typeClass = ElementType.getTypeClass(e.type);
            e.backspaceCount = 0;
            id++;
        });

        return elements;
    }

}