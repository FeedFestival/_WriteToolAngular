import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OnResizeService } from './on-resize.service';

@Component({
    selector: 'app-on-resize',
    templateUrl: './on-resize.component.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
})
export class OnResizeComponent implements AfterViewInit {

    @ViewChild('baseElement', { static: false }) baseElement: ElementRef;

    private lastResize: string;
    private sizeBreakpoints = {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200,
        laptop: 1364
    };

    constructor(
        private onResizeService: OnResizeService
    ) { }

    ngAfterViewInit() {
        // console.log("TCL: OnResizeComponent -> ngAfterViewInit -> this.baseElement", this.baseElement)
        // console.log("TCL: OnResizeComponent -> ngAfterViewInit -> this.baseElement.nativeElement.innerWidth", this.baseElement.nativeElement.clientWidth)
        this.onResize({ target: { innerWidth: this.baseElement.nativeElement.clientWidth } });
    }

    onResize(event) {
        let currentResize;
        if (event.target.innerWidth < this.sizeBreakpoints.xs) {
            currentResize = 'xs';
        } else if (event.target.innerWidth < this.sizeBreakpoints.sm) {
            currentResize = 'sm';
        } else if (event.target.innerWidth < this.sizeBreakpoints.md) {
            currentResize = 'md';
        } else if (event.target.innerWidth < this.sizeBreakpoints.lg) {
            currentResize = 'lg';
        } else if (event.target.innerWidth < this.sizeBreakpoints.laptop) {
            currentResize = 'laptop';
        } else {
            currentResize = 'xl';
        }

        if (this.lastResize !== currentResize) {
            this.lastResize = currentResize;
            this.onResizeService.emitResizeEvent(this.lastResize);
        }
    }
}
