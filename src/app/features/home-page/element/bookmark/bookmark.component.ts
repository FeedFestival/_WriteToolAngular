import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html'
})
export class BookmarkComponent implements OnInit {

    isBookmarked: boolean;

    @Output() onBookmark: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
    }

    toggle() {
        this.isBookmarked = !this.isBookmarked;
        this.onBookmark.emit(this.isBookmarked);
    }
}
