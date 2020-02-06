import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgScrollbar } from 'ngx-scrollbar';
import { PageDialogComponent } from 'src/app/shared/components/page-dialog/page-dialog.component';

@Component({
    selector: 'app-character-dialog',
    templateUrl: './character-dialog.component.html',
    // styleUrls: ['./character-dialog.component.scss']
})
export class CharacterDialogComponent implements OnInit, AfterViewInit {

    @ViewChild('NgScrollbar', { static: true }) scrollRef: NgScrollbar;

    constructor(
        public dialogRef: MatDialogRef<PageDialogComponent>,
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
