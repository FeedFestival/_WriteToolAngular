import { EventEmitter, Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { ElementType } from 'src/app/app.constants';
import { TestHttpClient } from 'src/app/TestHttpClient/TestHttpClient.service';
import { IBookmark } from '../page-map/page-map.component';

export const SCENE_HEADING_NEW_ELS = [ElementType.ACTION, ElementType.CHARACTER, ElementType.COMMENT, ElementType.PICTURE, ElementType.VIDEO, ElementType.SOUND];
export const ACTION_NEW_ELS = [ElementType.SCENE_HEADING, ElementType.CHARACTER, ElementType.COMMENT, ElementType.PICTURE, ElementType.VIDEO, ElementType.SOUND];
export const CHARACTER_NEW_ELS = [ElementType.DIALOG];
export const DIALOG_NEW_ELS = [ElementType.SCENE_HEADING, ElementType.ACTION, ElementType.CHARACTER, ElementType.COMMENT, ElementType.PICTURE, ElementType.VIDEO, ElementType.SOUND];

@Injectable({ providedIn: 'root' })
export class ElementsService {

    scrollToElementChange: EventEmitter<any> = new EventEmitter<any>();
    updateMap: EventEmitter<any> = new EventEmitter<any>();
    goToBookmark: EventEmitter<string> = new EventEmitter<string>();
    storyChange: EventEmitter<any> = new EventEmitter<any>();
    storyNameEvent: EventEmitter<any> = new EventEmitter<any>();

    allowedNewElements: string[];

    currentElementType: string;

    http: TestHttpClient;

    private story: any;
    private userId: string;
    private isLoggedIn: boolean;

    constructor(
        private testHttpClient: TestHttpClient,
        private localStorage: LocalStorageService
    ) {
        this.http = testHttpClient;
    }

    emitScrollToElementEmitterEvent(element) {
        this.scrollToElementChange.emit(element);
    }

    getScrollToElementEmitter(): EventEmitter<any> {
        return this.scrollToElementChange;
    }

    emitGoToBookmark(bookmarkId) {
        this.goToBookmark.emit(bookmarkId);
    }

    getGoToBookmark(): EventEmitter<string> {
        return this.goToBookmark;
    }

    getUpdateMap(): EventEmitter<any> {
        return this.updateMap;
    }

    getStoryChange(): EventEmitter<any> {
        return this.storyChange;
    }

    emitStoryChange(story) {
        this.storyChange.emit(story);
    }

    getElements(storyId?, getDefault?): Observable<any> {

        if (getDefault) {
            return of(this.getStartingText());
        } else if (storyId) {
            if (this.isLoggedIn) {
                return of([]);
            } else {
                let elements: any[] = [];
                const s = this.localStorage.retrieve(storyId);
                if (s && s.length !== 0) {
                    elements = JSON.parse(s);
                }
                return of(elements);
            }
        } else {
            return of([]);
        }
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
        switch (elementType) {
            case ElementType.SCENE_HEADING:
            // return SCENE_HEADING_NEW_ELS.some(eT => eT === nextElementType);
            case ElementType.ACTION:
            // return ACTION_NEW_ELS.some(eT => eT === nextElementType);
            case ElementType.CHARACTER:
            // return CHARACTER_NEW_ELS.some(eT => eT === nextElementType);
            case ElementType.DIALOG:
            // return DIALOG_NEW_ELS.some(eT => eT === nextElementType);
            case ElementType.SOUND:
            case ElementType.VIDEO:
            case ElementType.PICTURE:
            case ElementType.COMMENT:
                return true;
            default:
                return false;
        }
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

    recalculateBookmarks(elements) {
        const bookmarkedElements: IBookmark[] = elements.filter(e => e.isBookmarked).map(e => {
            return ({
                id: e.id,
                type: e.type,
                text: e.text,
                isSecondary: e.type !== ElementType.SCENE_HEADING && e.type !== ElementType.COMMENT
            } as IBookmark)
        });

        this.updateMap.emit(bookmarkedElements);
    }

    getStoryNameEventEvent(): EventEmitter<string> {
        return this.storyNameEvent;
    }

    getStory() {
        return this.story;
    }

    setStory(story, userId) {
        this.story = story;
        this.userId = userId;
        this.isLoggedIn = true;
        this.storyNameEvent.emit(this.story.name);
    }
}