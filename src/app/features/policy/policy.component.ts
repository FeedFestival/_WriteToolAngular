import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-policy',
    templateUrl: './policy.component.html',
    styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit, AfterViewInit {

    @ViewChild('NgScrollbar', { static: true }) scrollRef: NgScrollbar;
    show = false;

    constructor(
        public dialogRef: MatDialogRef<PolicyComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

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
