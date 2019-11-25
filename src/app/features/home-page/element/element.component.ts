import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ElementType } from 'src/app/app.constants';
import { CursorComponent } from '../cursor/cursor.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

    withRichText: false;
    Editor = ClassicEditor;
    editorModel = {
        editorData: '<p>Hello, world!</p>',
        config: {
            toolbar: [ 'bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList', ]
            // toolbarGroups: [
            //     { name: 'document', groups: ['mode', 'document', 'doctools'] },
            //     { name: 'clipboard', groups: ['clipboard', 'undo'] },
            //     { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
            //     { name: 'forms', groups: ['forms'] },
            //     '/',
            //     { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
            //     { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
            //     { name: 'links', groups: ['links'] },
            //     { name: 'insert', groups: ['insert'] },
            //     '/',
            //     { name: 'styles', groups: ['styles'] },
            //     { name: 'colors', groups: ['colors'] },
            //     { name: 'tools', groups: ['tools'] },
            //     { name: 'others', groups: ['others'] },
            //     { name: 'about', groups: ['about'] }
            // ]
        }
    };

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

    isOutOfView() {
        const bounding = this.inputRef.nativeElement.getBoundingClientRect();
        return (bounding.y < 200 || bounding.y > (document.documentElement.clientHeight - 200));
    }

    onActionRichText() {
        console.log("TCL: ElementComponent -> onActionRichText -> this.withRichText", this.withRichText);
    }
}
