import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import * as _ from 'lodash';
import { EditState, ElementType, Key } from 'src/app/app.constants';
import { Hotkeys } from 'src/app/shared/components/hotkeys.service';
import { NavigationService } from 'src/app/shared/navigation/navigation.service';
import { ElementComponent } from './element/element.component';
import { ElementsService } from './element/elements.service';

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
        private elementsService: ElementsService,
        private navigationService: NavigationService
    ) { }

    ngOnInit() {

        if (!this.elements) {
            this.elements = this.elementsService.getStartingText();
        }

        this.currentElement = this.elements[this.elements.length - 1];
        this.currentElement.underCarret = true;

        console.log("TCL: HomePageComponent -> ngOnInit -> this.elements", this.elements)

        this.navigationService.getEditStateEmitter()
            .subscribe((editState) => {
                this.editState = editState;
            });
        this.navigationService.emitEditStateEvent(EditState.MAIN);

        this.hotkeys.addShortcut({ keys: Key.ArrowUp })
            .subscribe(() => {
                this.onArrowUp();
            });
        this.hotkeys.addShortcut({ keys: Key.ArrowDown })
            .subscribe(() => {
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
    }

    onEdit(index) {

        // console.log('focus: ' + index);

        if (this.currentElement) {
            this.currentElement.underCarret = false;
        }

        this.currentElement = this.elements[index];
        this.currentElement.underCarret = true;
        this.currentElement.isEditing = true;

        this.navigationService.emitEditStateEvent(EditState.TEXT);
    }

    onBlur(index) {

        // console.log('blur: ' + index);

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

        if (this.editState === EditState.NEW) {
            this.onEscape();
        }

        const index = this.elements.findIndex(e => e.id === this.currentElement.id);
        const newIndex = index - 1;

        if (newIndex >= 0) {
            this.setUnderCarret(index, newIndex);
        }
    }

    onArrowDown(event?) {

        if (this.editState === EditState.NEW) {
            this.onEscape();
        }

        const index = this.elements.findIndex(e => e.id === this.currentElement.id);
        const newIndex = index + 1;

        if (newIndex < this.elements.length) {
            this.setUnderCarret(index, newIndex);
        }
    }

    private setUnderCarret(index, newIndex) {
        this.elements[index].underCarret = false;
        this.currentElement = this.elements[newIndex];
        this.currentElement.underCarret = true;
    }

    private editElementAtIndex(index, newIndex) {
        this.setUnderCarret(index, newIndex);
        setTimeout(__ => this.onTab());
    }

    onEnter() {
        if (this.editState === EditState.NEW) {
            return;
        }
        this.navigationService.emitEditStateEvent(EditState.NEW);
        this.elementsService.setAllowedElements(this.currentElement.type);
    }

    onSKey() {
        // console.log('S -> ' + this.editState);
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

    createNew(elementType) {

        const index = this.elements.findIndex(e => e.id === this.currentElement.id);
        const newId = _.maxBy(this.elements, 'id').id + 1;
        let newIndex = index + 1;

        const isLastElement = (index === this.elements.length - 1);

        if (isLastElement === false) {
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
        
        newIndex = this.elements.findIndex(e => e.id === newId);
        this.editElementAtIndex(index, newIndex);
    }
}
