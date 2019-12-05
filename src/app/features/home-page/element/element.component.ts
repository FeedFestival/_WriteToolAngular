import { Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnInit, Output, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { ElementType } from 'src/app/app.constants';
import { CursorComponent } from '../cursor/cursor.component';
import { ElementsService } from './elements.service';

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
    @ViewChild('ckEditorRef', { static: false }) ckEditorRef: ElementRef;

    isBrowser = false;

    ElementTypeRef = ElementType;
    loaded = false;

    asyncObject: any = {
    };
    editorModel = {
        editorData: '<p>Hello, world!</p>',
        config: {
            toolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList']
        }
    };

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private elementsService: ElementsService
    ) {
        this.isBrowser = (platformId === 'browser');
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes) {
            if (changes.element && changes.element.currentValue) {
                this.loaded = true;

                if (this.isBrowser) {
                    if (this.element.type === ElementType.ACTION) {
                        const clasicEditor = import('@ckeditor/ckeditor5-build-classic');
                        clasicEditor.then(classicEditor => {
                            this.asyncObject.Editor = classicEditor.default;
                        });
                    }
                }
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
        let bounding;
        if (this.inputRef) {
            bounding = this.inputRef.nativeElement.getBoundingClientRect();
        } else {
            const ckEditor = (this.ckEditorRef as any);
            if (ckEditor) {
                bounding = ckEditor.elementRef.nativeElement.getBoundingClientRect();
            }
        }

        if (bounding) {
            return (bounding.y < 200 || bounding.y > (document.documentElement.clientHeight - 200));
        }
        return false;
    }

    onActionRichText(e) {
        if (this.element.hasRichText) {
            this.editorModel.editorData = this.elementsService.convertToHtml(this.element.text);

            setTimeout(() => {
                (this.ckEditorRef as any).focus
                    .subscribe(() => {
                        this.edit();
                    });
                (this.ckEditorRef as any).blur
                    .subscribe(() => {
                        this.blur();
                    });
                const el = (this.ckEditorRef as any).elementRef.nativeElement;
                el.lastElementChild.lastElementChild.lastElementChild.click();
                el.lastElementChild.lastElementChild.lastElementChild.focus();
            });
        } else {
            this.element.text = this.elementsService.stripHtml(this.editorModel.editorData);
            setTimeout(() => {
                this.inputRef.nativeElement.click();
                this.inputRef.nativeElement.focus();
            });
        }
    }
}
