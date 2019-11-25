export const ElementType = {
    SCENE_HEADING: 'SCENE HEADING',
    ACTION: 'ACTION',
    CHARACTER: 'CHARACTER',
    DIALOG: 'DIALOG',

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
    Y: 'y'
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
