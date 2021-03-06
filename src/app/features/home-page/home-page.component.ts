import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import * as _ from 'lodash';
import { EditState, ElementType, Key } from 'src/app/app.constants';
import { Hotkeys } from 'src/app/shared/components/hotkeys.service';
import { NavigationService } from 'src/app/shared/navigation/navigation.service';
import { ElementComponent } from './element/element.component';
import { ElementsService } from './element/elements.service';
import { UndoService } from 'src/app/shared/components/undo.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    ElementTypeRef = ElementType;

    elements: any[];
    currentElement: any;

    editState: string;

    @ViewChildren(ElementComponent) elementsRef: QueryList<any>;

    constructor(
        private hotkeys: Hotkeys,
        private undoService: UndoService,
        private elementsService: ElementsService,
        private navigationService: NavigationService
    ) {
        undoService.getUndoStateEmitter()
            .subscribe((oldState) => {
                this.setPreviousState(oldState);
            });
    }

    ngOnInit() {

        if (!this.elements) {
            this.elements = this.elementsService.getStartingText();
        }

        this.setCurrentElement(this.elements.length - 1);
        setTimeout(() => {
            this.scrollToElementIfOutOfView();
        });

        this.saveUndoState();

        // console.log("TCL: HomePageComponent -> ngOnInit -> this.elements", this.elements)

        this.navigationService.getEditStateEmitter()
            .subscribe((editState) => {
                this.editState = editState;
            });
        this.navigationService.emitEditStateEvent(EditState.MAIN);

        this.hotkeys.addShortcut({ keys: Key.ArrowUp })
            .subscribe(() => {
                if (this.editState === EditState.NEW) {
                    this.onEscape();
                }
                this.onArrowUp();
            });
        this.hotkeys.addShortcut({ keys: Key.ArrowDown })
            .subscribe(() => {
                if (this.editState === EditState.NEW) {
                    this.onEscape();
                }
                this.onArrowDown();
            });
        this.hotkeys.addShortcut({ keys: Key.Tab })
            .subscribe(() => {
                this.onTab();
            });
        //
        this.hotkeys.addShortcut({ keys: Key.Escape })
            .subscribe(() => {
                this.onEscape();
            });
        //
        this.hotkeys.addShortcut({ keys: Key.Enter })
            .subscribe(() => {
                if (this.editState === EditState.NEW) {
                    return;
                }
                this.onEnter();
            });
        this.hotkeys.addShortcut({ keys: Key.S })
            .subscribe(() => {
                this.onSKey();
            });
        this.hotkeys.addShortcut({ keys: Key.A })
            .subscribe(() => {
                this.onAKey();
            });
        this.hotkeys.addShortcut({ keys: Key.C })
            .subscribe(() => {
                this.onCKey();
            });
        this.hotkeys.addShortcut({ keys: Key.D })
            .subscribe(() => {
                this.onDKey();
            });
        //
        this.hotkeys.addShortcut({ keys: Key.Backspace })
            .subscribe(() => {
                this.onBackspace();
            });

        this.hotkeys.addShortcut({ keys: Key.Z })
            .subscribe(() => {
                this.onUndo();
            });
        this.hotkeys.addShortcut({ keys: Key.Y })
            .subscribe(() => {
                this.onRedo();
            });
    }

    onEdit(index) {

        if (this.currentElement) {
            this.unCarretElement();
        }

        this.setCurrentElement(index);
        this.currentElement.isEditing = true;

        this.navigationService.emitEditStateEvent(EditState.TEXT);

        setTimeout(() => {
            this.scrollToElementIfOutOfView();
        });
    }

    onBlur(index) {

        const element = this.elements[index];
        if (!element.text || element.text.length === 0) {
            element.inputClass += ' input-empty';
        } else {
            element.inputClass = element.inputClass.replace(/ input-empty/g, '');
        }

        if (this.currentElement) {
            this.currentElement.isEditing = false;
        }

        this.navigationService.emitEditStateEvent(EditState.MAIN);

        // setTimeout(() => {
        //     this.undoService.setState(this.elements);
        // });
    }

    onEscape() {
        if (this.editState === EditState.NEW) {
            this.navigationService.emitEditStateEvent(EditState.MAIN);
            return;
        }
        const el = this.elementsRef.find(c => c.element.id === this.currentElement.id);
        el.inputRef.nativeElement.blur();
    }

    onTab() {
        const el = this.elementsRef.find(c => c.element.id === this.currentElement.id);
        el.inputRef.nativeElement.click();
        this.navigationService.emitEditStateEvent(EditState.TEXT);
    }

    onArrowUp(event?) {

        const index = this.elements.findIndex(e => e.id === this.currentElement.id);
        const newIndex = index - 1;

        if (newIndex >= 0) {
            this.setUnderCarret(index, newIndex);
        }
    }

    onArrowDown(event?) {

        const index = this.elements.findIndex(e => e.id === this.currentElement.id);
        const newIndex = index + 1;

        if (newIndex < this.elements.length) {
            this.setUnderCarret(index, newIndex);
        }
    }

    setUnderCarret(index, newIndex) {
        if (index === null) {
            this.unCarretElement();
        } else {
            if (index < this.elements.length) {
                this.unCarretElement();
            }
        }
        this.setCurrentElement(newIndex);

        setTimeout(() => {
            this.scrollToElementIfOutOfView();
        });
    }

    private scrollToElementIfOutOfView(force?) {

        if (force) {
            this.elementsService.emitScrollToElementEmitterEvent('#element' + this.currentElement.id);
        }
        const el = this.elementsRef.find(c => c.element.id === this.currentElement.id);
        if (el.isOutOfView()) {
            this.elementsService.emitScrollToElementEmitterEvent('#element' + this.currentElement.id);
        }
    }

    private editElementAtIndex(index, newIndex) {
        this.setUnderCarret(index, newIndex);
        setTimeout(__ => this.onTab());
    }

    private setCurrentElement(index) {
        this.currentElement = this.elements[index];
        this.currentElement.underCarret = true;
        this.elementsService.currentElementType = this.currentElement.type;
    }

    private unCarretElement() {
        this.currentElement.underCarret = false;
        this.currentElement.backspaceCount = 0;
    }

    onEnter() {

        if (this.editState === EditState.TEXT) {
            if (this.currentElement.type === ElementType.CHARACTER) {

                const index = this.elements.findIndex(e => e.id === this.currentElement.id);
                const newIndex = index + 1;
                const isLastElement = (index === this.elements.length - 1);
                let isNextElementDialog = false;

                if (isLastElement === false) {
                    isNextElementDialog = this.elements[newIndex].type === ElementType.DIALOG;
                }

                this.onEscape();

                if (isLastElement || isNextElementDialog === false) {
                    this.createNew(ElementType.DIALOG, true);
                } else {
                    setTimeout(() => {
                        this.editElementAtIndex(index, newIndex);
                    }, 100);
                }
            } else if (this.currentElement.type === ElementType.SCENE_HEADING) {
                this.onEscape();
            }
        } else {
            this.navigationService.emitEditStateEvent(EditState.NEW);
            this.elementsService.setAllowedElements(this.currentElement.type);
        }
    }

    onSKey() {
        if (false === this.elementsService.isValidNewElement(ElementType.SCENE_HEADING)) {
            this.onEscape();
            return;
        }
        this.createNew(ElementType.SCENE_HEADING);
    }

    onAKey() {
        if (false === this.elementsService.isValidNewElement(ElementType.ACTION)) {
            this.onEscape();
            return;
        }
        this.createNew(ElementType.ACTION);
    }

    onCKey() {
        if (false === this.elementsService.isValidNewElement(ElementType.CHARACTER)) {
            this.onEscape();
            return;
        }
        this.createNew(ElementType.CHARACTER);
    }

    onDKey() {
        if (false === this.elementsService.isValidNewElement(ElementType.DIALOG)) {
            this.onEscape();
            return;
        }
        this.createNew(ElementType.DIALOG);
    }

    onBackspace() {

        if (this.editState === EditState.TEXT) {
            if (!this.currentElement.text || this.currentElement.text === '') {
                if (this.currentElement.backspaceCount > 1) {
                    this.onEscape();
                    setTimeout(() => { this.remove(); });
                } else {
                    this.currentElement.backspaceCount++;
                }
            } else {
                this.currentElement.backspaceCount = 0;
            }
        } else {
            this.remove();
        }
    }

    createNew(elementType, dontCheckNextElement?) {

        const index = this.elements.findIndex(e => e.id === this.currentElement.id);
        const newId = this.elementsService.guid();
        let newIndex = index + 1;

        const isLastElement = (index === this.elements.length - 1);

        if (isLastElement === false && !dontCheckNextElement) {
            const nextElementType = this.elements[newIndex].type;
            if (false === this.elementsService.canInsert(elementType, nextElementType)) {
                this.editElementAtIndex(index, newIndex);
                return;
            }
        }

        const newElement = {
            id: newId,
            type: elementType,
            text: this.elementsService.getDefaultText(elementType),
            inputClass: ElementType.getInputClass(elementType),
            typeClass: ElementType.getTypeClass(elementType)
        };

        if (isLastElement) {
            this.elements.push(newElement);
        } else {
            this.elements.splice(index + 1, 0, newElement);
        }

        this.saveUndoState();

        newIndex = this.elements.findIndex(e => e.id === newId);
        this.editElementAtIndex(index, newIndex);
    }

    private remove(recursive?) {

        const index = this.elements.findIndex(e => e.id === this.currentElement.id);
        const isLastElement = (index === this.elements.length - 1);
        const newIndex = isLastElement ? index - 1 : index - 1;

        if (!recursive) {
            if (this.currentElement.type === ElementType.DIALOG) {
                this.elements.splice(index - 1, 1);
                this.remove(true);
                return;
            } else if (this.currentElement.type === ElementType.CHARACTER) {
                this.elements.splice(index + 1, 1);
                this.remove(true);
                return;
            }
        }

        this.elements.splice(index, 1);
        this.setUnderCarret(index, newIndex);

        this.saveUndoState();
    }

    onUndo() {

        if (this.undoService.canUndo === false) {
            return;
        }
        this.undoService.undo();
    }

    onRedo() {

        if (this.undoService.canRedo === false) {
            return;
        }

        this.undoService.redo();
    }

    setPreviousState(oldState) {

        // console.log("TCL: HomePageComponent -> setPreviousState -> oldState.elements", oldState)

        const index = this.getIndexUnderCarret(oldState.elements);

        this.elements = JSON.parse(JSON.stringify(oldState.elements));
        this.elements.forEach(e => e.underCarret = false);

        this.setCurrentElement(index);
        setTimeout(() => {
            this.scrollToElementIfOutOfView();
        });
    }

    private saveUndoState() {
        const elementsCopy = JSON.parse(JSON.stringify(this.elements));
        const index = this.getIndexUnderCarret(elementsCopy);
        setTimeout(() => {
            const guid = this.elementsService.guid();
            this.undoService.setState(guid);

            setTimeout(() => {
                this.undoService.addState({
                    elements: elementsCopy,
                    guid
                });
            });
        });
    }

    private getIndexUnderCarret(elements) {
        let index = elements.findIndex(e => e.underCarret === true);
        console.log('ndx:' + index);
        if (index < 0) {
            const diff = _.difference(elements.map(e => e.id), this.elements.map(e => e.id))[0];
            index = elements.findIndex(e => e.id === diff);
            console.log('diff:' + index);
        }
        return index;
    }
}
