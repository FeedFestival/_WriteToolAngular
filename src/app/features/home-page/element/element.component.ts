import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ElementType } from 'src/app/app.constants';
import { CursorComponent } from '../cursor/cursor.component';

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit, OnChanges {

    @Input() element: any;
    @Input() i: any;
    @Input() underCarret: boolean;

    @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();
    @Output() onBlur: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('inputRef', { static: false }) inputRef: ElementRef;
    @ViewChild('cursorRef', { static: false }) cursorRef: CursorComponent;

    ElementTypeRef = ElementType;
    loaded = false;

    constructor(
    ) {

    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes) {
            if (changes.element && changes.element.currentValue) {
                this.loaded = true;
            }
            if (changes.underCarret) {

                // console.log(this.element.id + ' - ' + this.underCarret);
                if (!this.cursorRef) {
                    console.warn(`Can't get cursor.`);
                    return;
                }

                changes.underCarret.currentValue === true ? this.cursorRef.open() : this.cursorRef.close();
            }
        }
    }

    edit() {
        this.onEdit.emit(this.i);
    }

    blur() {
        this.onBlur.emit(this.i);
    }
}
