import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ElementType } from 'src/app/app.constants';
import { Hotkeys } from 'src/app/shared/components/hotkeys.service';
import { take } from 'rxjs/internal/operators/take';
import { ElementComponent } from './element/element.component';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    ElementTypeRef = ElementType;

    elements: any[] = [
        {
            type: ElementType.SCENE_HEADING,
            text: 'INT. UNKNOWN LOCATION'
        },
        {
            type: ElementType.ACTION,
            text: 'Some kids are going to camping'
        },
        {
            type: ElementType.CHARACTER,
            text: 'Unknown'
        },
        {
            type: ElementType.DIALOG,
            text: '...'
        },
    ];
    currentElement: any;

    @ViewChildren(ElementComponent) elementsRef: QueryList<any>;

    constructor(
        private hotkeys: Hotkeys
    ) { }

    ngOnInit() {

        let id = 1;
        this.elements.forEach(e => {
            e.id = id;
            e.inputClass = ElementType.getInputClass(e.type);
            e.typeClass = ElementType.getTypeClass(e.type);
            id++;
        });

        this.currentElement = this.elements[0];
        this.currentElement.underCarret = true;

        console.log("TCL: HomePageComponent -> ngOnInit -> this.elements", this.elements)

        this.hotkeys.addShortcut({ keys: 'ArrowUp' })
            .subscribe(() => {
                this.onArrowUp();
            });
        this.hotkeys.addShortcut({ keys: 'ArrowDown' })
            .subscribe(() => {
                this.onArrowDown();
            });
        this.hotkeys.addShortcut({ keys: 'Tab' })
            .subscribe(() => {
                this.onTab();
            });
        this.hotkeys.addShortcut({ keys: 'Escape' })
            .subscribe(() => {
                this.onEscape();
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

        this.hotkeys.lock();
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

        this.hotkeys.unlock();
    }

    onEscape() {
        console.log('Escape');
        const el = this.elementsRef.find(c => c.element.id === this.currentElement.id);
        el.inputRef.nativeElement.blur();
    }

    onTab() {
        const el = this.elementsRef.find(c => c.element.id === this.currentElement.id);
        el.inputRef.nativeElement.click();
    }

    onArrowUp(event?) {
        const index = this.elements.findIndex(e => e.id === this.currentElement.id);
        const newIndex = index - 1;

        if (newIndex >= 0) {
            this.elements[index].underCarret = false;
            this.currentElement = this.elements[newIndex];
            this.currentElement.underCarret = true;
        }
    }

    onArrowDown(event?) {
        const index = this.elements.findIndex(e => e.id === this.currentElement.id);
        const newIndex = index + 1;

        if (newIndex < this.elements.length) {
            this.elements[index].underCarret = false;
            this.currentElement = this.elements[newIndex];
            this.currentElement.underCarret = true;
        }
    }

}
