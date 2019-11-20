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
