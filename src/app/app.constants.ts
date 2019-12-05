import { HttpHeaders } from '@angular/common/http';

export const HttpDefaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
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
    withCredentials: true,
    // useXDomain: true,
    'cache': false,
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'If-Modified-Since': '0',
    // 'responseType': 'json'
};

export const ElementType = {
    SCENE_HEADING: 'SCENE HEADING',
    ACTION: 'ACTION',
    CHARACTER: 'CHARACTER',
    DIALOG: 'DIALOG',
    EMPTY: 'EMPTY',

    getInputClass: (elementType) => {
        switch (elementType) {
            case ElementType.SCENE_HEADING:
                return 'w-100';
            case ElementType.ACTION:
                return 'w-100';
            case ElementType.CHARACTER:
                return 'w-auto';
            case ElementType.DIALOG:
                return 'w-auto';
            default:
                break;
        }
    },

    getTypeClass: (elementType) => {
        switch (elementType) {
            case ElementType.SCENE_HEADING:
                return 'scene-heading';
            case ElementType.ACTION:
                return 'action';
            case ElementType.CHARACTER:
                return 'character';
            case ElementType.DIALOG:
                return 'dialog';
            default:
                break;
        }
    }
}

export const EditState = {
    MAIN: 'MAIN',
    TEXT: 'TEXT',
    NEW: 'NEW'
}

export const Key = {
    ArrowUp: 'ArrowUp',
    ArrowDown: 'ArrowDown',
    Tab: 'Tab',
    //
    Escape: 'Escape',
    //
    Enter: 'Enter',
    Backspace: 'Backspace',
    //
    S: 's',
    A: 'a',
    C: 'c',
    D: 'd',
    //
    Z: 'z',
    Y: 'y',
    //
}

export const MainAvailableKeys = [
    { key: '&#8629;' , text: 'Enter', class: 'symbol' },
    { key: '&#8633;' , text: 'Tab', class: 'symbol' },
    { key: '&uarr;', text: 'Arrow Up', class: 'symbol'},
    { key: '&darr;', text: 'Arrow Down', class: 'symbol'}
];

export const TextAvailableKeys = [
    { key: 'Esc' , text: 'ape' },
    { key: '&#8633;' , text: 'Tab', class: 'symbol' }
];

export const NewAvailableKeys = [
    { key: 'S' , text: 'cene Heading', id: ElementType.SCENE_HEADING },
    { key: 'A' , text: 'ction', id: ElementType.ACTION },
    { key: 'C' , text: 'haracter', id: ElementType.CHARACTER },
    { key: 'D' , text: 'ialog', id: ElementType.DIALOG }
];
