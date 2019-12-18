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
    COMMENT: 'COMMENT',
    PICTURE: 'PICTURE',
    VIDEO: 'VIDEO',
    SOUND: 'SOUND',

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
            case ElementType.COMMENT:
                return 'w-100';
            case ElementType.PICTURE:
                return 'w-auto';
            case ElementType.VIDEO:
                return 'w-auto';
            case ElementType.SOUND:
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
            case ElementType.COMMENT:
                return 'comment';
            case ElementType.PICTURE:
                return 'picture';
            case ElementType.VIDEO:
                return 'video';
            case ElementType.SOUND:
                return 'sound';
            default:
                break;
        }
    }
}

export const EditState = {
    DEFAULT: 'DEFAULT',
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
    P: 'p',
    V: 'v',
    H: 'h',
    Slash: '/',
    //
    Z: 'z',
    Y: 'y',
    //
}

export const MainAvailableKeys = [
    { key: '&#8629;', text: 'Enter', class: 'symbol', code: Key.Enter },
    { key: '&#8633;', text: 'Tab', class: 'symbol', code: Key.Tab },
    { key: '&uarr;', text: 'Arrow Up', class: 'symbol' },
    { key: '&darr;', text: 'Arrow Down', class: 'symbol' }
];

export const TextAvailableKeys = [
    { key: 'Esc', text: 'ape', code: Key.Escape, hide: false },
    { key: '&#8633;', text: 'Tab', class: 'symbol', code: Key.Tab, hide: false },
    { key: 'Windows Key + .', text: 'Emoticons', class: 'symbol', hide: false }
];

export const NewAvailableKeys = [
    { pretext: 'Scene ', key: 'H', text: 'eading', id: ElementType.SCENE_HEADING, code: Key.H },
    { pretext: '', key: 'A', text: 'ction', id: ElementType.ACTION, code: Key.A },
    { pretext: '', key: 'C', text: 'haracter', id: ElementType.CHARACTER, code: Key.C },
    { pretext: '', key: 'D', text: 'ialog', id: ElementType.DIALOG, code: Key.D },
    { pretext: '', key: 'P', text: 'icture', id: ElementType.PICTURE, code: Key.P },
    { pretext: 'Youtube ', key: 'V', text: 'ideo', id: ElementType.VIDEO, code: Key.V },
    { pretext: '', key: 'S', text: 'ound', id: ElementType.SOUND, code: Key.S },
    { pretext: '', key: '/', text: 'Comment', id: ElementType.COMMENT, code: Key.Slash },
];

export const ScrollBreakpoints = {
    xs: {
        max: 50,
        min: 150
    },
    sm: {
        max: 150,
        min: 333
    }
}
