import { Component, OnInit, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { EditState, ElementType, Key } from 'src/app/app.constants';
import { Hotkeys } from 'src/app/shared/components/hotkeys.service';
import { NavigationService } from 'src/app/shared/navigation/navigation.service';
import { ElementComponent } from './element/element.component';
import { ElementsService } from './element/elements.service';
import { UndoService } from 'src/app/shared/components/undo.service';
import { IElement } from 'src/app/shared/models/element';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from './seo.service';
import { HeaderService } from 'src/app/shared/header/header.service';
import { LocalStorageService } from 'ngx-webstorage';
import { OnResizeService } from 'src/app/shared/on-resize/on-resize.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    ElementTypeRef = ElementType;

    story: any;
    elements: any[];
    currentElement: any;

    editState: string;

    bp: string;

    @ViewChildren(ElementComponent) elementsRef: QueryList<any>;

    constructor(
        private headerService: HeaderService,
        private seoService: SeoService,
        private hotkeys: Hotkeys,
        private undoService: UndoService,
        private titleService: Title,
        private metaService: Meta,
        private localStorage: LocalStorageService,
        private elementsService: ElementsService,
        private navigationService: NavigationService,
        private onResizeService: OnResizeService
    ) {
        undoService.getUndoStateEmitter()
            .subscribe((oldState) => {
                this.setPreviousState(oldState);
            });

        onResizeService.getResizeEvent()
            .subscribe((bp) => {
                this.bp = bp;
            });

        elementsService.getGoToBookmark()
            .subscribe(bookmarkId => {
                const index = this.elements.findIndex(e => e.id === bookmarkId);
                this.setUnderCarret(null, index);
            });

        navigationService.getEditStateEmitter()
            .subscribe((editState) => {
                this.editState = editState;
            });

        navigationService.getClickNavEvent()
            .subscribe((code) => {
                switch (code) {
                    case Key.Enter:
                        this.onEnter();
                        break;
                    case Key.Tab:
                        this.onTab();
                        break;
                    case Key.Escape:
                        this.onEscape();
                        break;
                    case Key.H:
                        this.onHKey();
                        break;
                    case Key.A:
                        this.onAKey();
                        break;
                    case Key.C:
                        this.onCKey();
                        break;
                    case Key.D:
                        this.onDKey();
                        break;
                    case Key.P:
                        this.onPKey();
                        break;
                    case Key.V:
                        this.onVKey();
                        break;
                    case Key.S:
                        this.onSKey();
                        break;
                    case Key.Slash:
                        this.onSlashKey();
                        break;
                    default:
                        break;
                }
            });
    }

    ngOnInit() {

        const page = 'home';
        this.titleService.setTitle(this.seoService.getTitle(page));
        this.seoService.getAllTags().forEach(tag => {
            this.metaService.removeTag(tag);
        });
        this.metaService.addTags(this.seoService.getMetaTags(page));


        const stories = JSON.parse(this.localStorage.retrieve('stories'));
        if (!stories || stories.length === 0) {
            this.elementsService.getElements()
                .subscribe(this.onElementsLoaded);
        } else {
            this.onStoryLoaded(stories[stories.length - 1]);
        }

        this.elementsService.getStoryChange()
            .subscribe(this.onStoryLoaded);

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
                this.onEnter();
            });
        this.hotkeys.addShortcut({ keys: Key.H })
            .subscribe(() => {
                this.onHKey();
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
        this.hotkeys.addShortcut({ keys: Key.P })
            .subscribe(() => {
                this.onPKey();
            });
        this.hotkeys.addShortcut({ keys: Key.V })
            .subscribe(() => {
                this.onVKey();
            });
        this.hotkeys.addShortcut({ keys: Key.S })
            .subscribe(() => {
                this.onSKey();
            });
        this.hotkeys.addShortcut({ keys: Key.Slash })
            .subscribe(() => {
                this.onSlashKey();
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
        //
        this.hotkeys.onControlSHotkey()
            .subscribe(() => {
                this.elementsService.save(this.elements, this.story.id);
                this.headerService.emitCanSaveEvent(false);
            });
        this.headerService.getSaveEvent()
            .subscribe(() => {
                this.elementsService.save(this.elements, this.story.id);
                this.headerService.emitCanSaveEvent(false);
            });
    }

    onStoryLoaded = (story) => {

        if (this.story && this.story.id === story.id) {
            return;
        }
        this.story = story;

        this.elementsService.getElements(this.story.id)
            .subscribe(this.onElementsLoaded);
    }

    onElementsLoaded = (elements) => {
        this.elements = elements;

        if (this.elements.length === 0) {
            this.createEmptyElement();
        }

        this.elements.forEach(e => {
            e.underCarret = false;
            if (e.type === ElementType.PICTURE) {
                e.image = this.localStorage.retrieve(e.id);
            }
            if (e.type === ElementType.SCENE_HEADING || e.type === ElementType.COMMENT) {
                e.isBookmarked = true;
            }
        });

        this.onBookmark();

        this.setCurrentElement(this.elements.length - 1);
        setTimeout(() => {
            this.scrollToElementIfOutOfView();
        });

        this.saveUndoState();
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

        this.headerService.emitCanSaveEvent();
    }

    onEscape() {
        if (this.editState === EditState.NEW) {
            this.navigationService.emitEditStateEvent(EditState.MAIN);
            return;
        }

        const el = this.elementsRef.find(c => c.element.id === this.currentElement.id);
        if (el.element.type === ElementType.PICTURE
            || el.element.type === ElementType.VIDEO
            || el.element.type === ElementType.SOUND) {
            el.element.isEditing = false;
            this.onBlur(el.i);
        } else {
            el.inputRef.nativeElement.blur();
        }
    }

    onTab() {
        const el = this.elementsRef.find(c => c.element.id === this.currentElement.id);
        if (el.element.type === ElementType.PICTURE
            || el.element.type === ElementType.VIDEO
            || el.element.type === ElementType.SOUND) {
            el.element.isEditing = true;

        } else {
            el.inputRef.nativeElement.click();
        }
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

    onBookmark() {
        this.elementsService.recalculateBookmarks(this.elements);
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
        setTimeout(__ => {
            this.onTab();
        });
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

        if (this.editState === EditState.NEW) {
            return;
        }

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

    onHKey() {
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

    onPKey() {
        if (false === this.elementsService.isValidNewElement(ElementType.PICTURE)) {
            this.onEscape();
            return;
        }
        this.createNew(ElementType.PICTURE);
    }

    onVKey() {
        if (false === this.elementsService.isValidNewElement(ElementType.VIDEO)) {
            this.onEscape();
            return;
        }
        this.createNew(ElementType.VIDEO);
    }

    onSKey() {
        if (false === this.elementsService.isValidNewElement(ElementType.SOUND)) {
            this.onEscape();
            return;
        }
        this.createNew(ElementType.SOUND);
    }

    onSlashKey() {
        if (false === this.elementsService.isValidNewElement(ElementType.COMMENT)) {
            this.onEscape();
            return;
        }
        this.createNew(ElementType.COMMENT);
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

        const newElement: IElement = {
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

        // const emptyIndex = this.elements.findIndex(e => e.type === ElementType.EMPTY);
        // if (emptyIndex >= 0) {
        //     this.elements.splice(emptyIndex, 1);
        // }

        this.saveUndoState();

        newIndex = this.elements.findIndex(e => e.id === newId);
        this.editElementAtIndex(index, newIndex);

        this.headerService.emitCanSaveEvent();
    }

    private createEmptyElement(index?) {
        if (index) {

        } else {
            const emptyElement: IElement = {
                id: this.elementsService.guid(),
                type: ElementType.EMPTY,
                text: '',
                inputClass: '',
                typeClass: 'empty'
            };
            this.elements.push(emptyElement);
        }
    }

    private remove(recursive?) {

        const index = this.elements.findIndex(e => e.id === this.currentElement.id);
        const isLastElement = (index === this.elements.length - 1);
        let newIndex = isLastElement ? index - 1 : index - 1;

        if (!recursive) {
            const willRemove = this.removeConectingChild(index);
            if (willRemove) {
                return;
            }
        }
        this.elements.splice(index, 1);
        if (this.elements.length === 0) {
            this.createEmptyElement();
            newIndex = 0;
        }
        this.setUnderCarret(index, newIndex);

        this.saveUndoState();
        this.headerService.emitCanSaveEvent();
    }

    private removeConectingChild(index): boolean {

        if (this.currentElement.type === ElementType.DIALOG) {
            this.elements.splice(index - 1, 1);
            this.remove(true);
            return true;
        } else if (this.currentElement.type === ElementType.CHARACTER) {
            this.elements.splice(index + 1, 1);
            this.remove(true);
            return true;
        }
        return false;
    }

    onUndo() {

        if (this.undoService.canUndo === false) {
            return;
        }
        this.undoService.undo();
        this.headerService.emitCanSaveEvent();
    }

    onRedo() {

        if (this.undoService.canRedo === false) {
            return;
        }

        this.undoService.redo();
        this.headerService.emitCanSaveEvent();
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
        // console.log('ndx:' + index);
        if (index < 0) {
            const diff = _.difference(elements.map(e => e.id), this.elements.map(e => e.id))[0];
            index = elements.findIndex(e => e.id === diff);
            // console.log('diff:' + index);
        }
        return index;
    }
}
