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

	constructor(
		private onResizeService: OnResizeService
	) { }

	ngAfterViewInit() {
		// console.log("TCL: OnResizeComponent -> ngAfterViewInit -> this.baseElement", this.baseElement)
		// console.log("TCL: OnResizeComponent -> ngAfterViewInit -> this.baseElement.nativeElement.innerWidth", this.baseElement.nativeElement.clientWidth)
		this.onResize({ target: { innerWidth: this.baseElement.nativeElement.clientWidth } });
	}

	private lastResize: string;

	onResize(event) {
		let currentResize;
		if (event.target.innerWidth < 576) {
			currentResize = 'xs';
		} else if (event.target.innerWidth < 768) {
			currentResize = 'sm';
		} else if (event.target.innerWidth < 992) {
			currentResize = 'md';
		} else if (event.target.innerWidth < 1200) {
			currentResize = 'lg';
		} else {
			currentResize = 'xl';
		}
		
		if (this.lastResize !== currentResize) {
			this.lastResize = currentResize;
			this.onResizeService.emitResizeEvent(this.lastResize);
		}
	}
}
