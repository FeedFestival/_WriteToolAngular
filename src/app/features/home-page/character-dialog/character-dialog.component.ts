import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { PageDialogComponent } from 'src/app/shared/components/page-dialog/page-dialog.component';
import { MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { NgScrollbar } from 'ngx-scrollbar';
import { ElementsService } from '../element/elements.service';
import { LocalStorageService } from 'ngx-webstorage';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-character-dialog',
    templateUrl: './character-dialog.component.html',
    // styleUrls: ['./character-dialog.component.scss']
})
export class CharacterDialogComponent implements OnInit, AfterViewInit {

    @ViewChild('NgScrollbar', { static: true }) scrollRef: NgScrollbar;

    constructor(
        public dialogRef: MatDialogRef<PageDialogComponent>,
        private elementsService: ElementsService,
        private localStorage: LocalStorageService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit() {
        this.scrollToTop();

        console.log(this.data);
    }

    ngAfterViewInit() {
        this.scrollToTop();
    }

    scrollToTop() {
        setTimeout(() => {
            this.scrollRef.scrollTo({
                top: 0
            });
        }, 100);
    }

    leave() {
        this.dialogRef.close();
    }
}
