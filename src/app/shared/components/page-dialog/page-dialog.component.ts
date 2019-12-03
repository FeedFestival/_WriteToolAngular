import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-policy',
    templateUrl: './page-dialog.component.html',
    styleUrls: ['./page-dialog.component.scss']
})
export class PageDialogComponent implements OnInit, AfterViewInit {

    @ViewChild('NgScrollbar', { static: true }) scrollRef: NgScrollbar;
    show = false;

    page = {
        showPrivacy: false,
        showContact: false,
        showAbout: false
    };

    constructor(
        public dialogRef: MatDialogRef<PageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.page = {
            ...this.page,
            ...data.args
        };
    }

    ngOnInit() {
        this.scrollToTop();
    }

    ngAfterViewInit() {
        this.scrollToTop();
    }

    scrollToTop() {
        setTimeout(() => {
            this.scrollRef.scrollTo({
                top: 0
            });
            this.show = true;
        }, 1000);
    }

    leave() {
        this.dialogRef.close();
    }
}
