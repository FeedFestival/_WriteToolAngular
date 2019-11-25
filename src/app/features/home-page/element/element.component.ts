import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ElementType } from 'src/app/app.constants';
import { CursorComponent } from '../cursor/cursor.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ElementsService } from './elements.service';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';

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
    @ViewChild('ckEditorRef', { static: false }) ckEditorRef: CKEditorComponent;

    ElementTypeRef = ElementType;
    loaded = false;

    Editor = ClassicEditor;
    editorModel = {
        editorData: '<p>Hello, world!</p>',
        config: {
            toolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList',]
        }
    };

    constructor(
        private elementsService: ElementsService
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
                    // console.warn(`Can't get cursor.`);
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
        let bounding
        if (this.inputRef) {
            bounding = this.inputRef.nativeElement.getBoundingClientRect();
        } else {
            bounding = (this.ckEditorRef as any).elementRef.nativeElement.getBoundingClientRect();
        }
             
        return (bounding.y < 200 || bounding.y > (document.documentElement.clientHeight - 200));
    }

    onActionRichText(e) {
        if (this.element.hasRichText) {
            this.editorModel.editorData = this.element.text;
        } else {
            this.element.text = this.elementsService.stripHtml(this.editorModel.editorData);
        }

        setTimeout(() => {
            this.ckEditorRef.focus
                .subscribe(() => {
                    this.edit();
                });
            this.ckEditorRef.blur
                .subscribe(() => {
                    this.blur();
                });
        });
    }
}
