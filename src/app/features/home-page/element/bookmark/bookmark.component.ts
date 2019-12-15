import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html'
})
export class BookmarkComponent implements OnInit {

    @Input() isBookmarked: boolean;

    @Output() onBookmark: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
    }

    toggle() {
        this.isBookmarked = !this.isBookmarked;
        this.onBookmark.emit(this.isBookmarked);
    }
}
