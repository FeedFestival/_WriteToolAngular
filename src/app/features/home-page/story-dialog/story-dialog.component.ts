import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgScrollbar } from 'ngx-scrollbar';
import { LocalStorageService } from 'ngx-webstorage';
import { PageDialogComponent } from 'src/app/shared/components/page-dialog/page-dialog.component';
import { ElementsService } from '../element/elements.service';

@Component({
    selector: 'app-story-dialog',
    templateUrl: './story-dialog.component.html',
    styleUrls: ['./story-dialog.component.scss']
})
export class StoryDialogComponent implements OnInit, AfterViewInit {

    stories: any[];

    selected: string;
    newStory: any = {};
    isStorySelected = false;

    @ViewChild('NgScrollbar', { static: true }) scrollRef: NgScrollbar;

    constructor(
        public dialogRef: MatDialogRef<PageDialogComponent>,
        private elementsService: ElementsService,
        private localStorage: LocalStorageService,
    ) {
    }

    ngOnInit() {
        this.scrollToTop();

        this.stories = JSON.parse(this.localStorage.retrieve('stories'));

        if (!this.stories) {
            this.stories = [
                { id: '', name: 'New Story' }
            ];
        }

        const story = this.elementsService.getStory();

        if (!story) {
            if (this.stories && this.stories.length === 1) {
                this.onChange({ value: this.stories[0].id });
            } else {
                this.selected = '';
                this.onChange({ value: '' });
            }
        } else {
            this.onChange({ value: story.id });
        }
    }

    ngAfterViewInit() {
        this.scrollToTop();
    }

    onChange(event) {

        if (event.value.length === 0) {
            this.newStory = {
                id: this.elementsService.guid(),
                name: '',
                isNew: true
            };

        } else {
            this.newStory = this.stories.find(s => s.id === event.value);
        }
        this.selected = this.stories[this.stories.findIndex(s => s.id === event.value)].id;
        this.isStorySelected = true;
    }

    save() {

        if (this.newStory.isNew) {
            this.newStory.isNew = false;
            this.stories.push(JSON.parse(JSON.stringify(this.newStory)));
        }

        this.localStorage.store('stories', JSON.stringify(this.stories));
        const lastIndex = this.stories.length - 1;
        this.selected = this.stories[lastIndex].id;
        this.onChange({ value: this.stories[lastIndex].id });
    }

    scrollToTop() {
        setTimeout(() => {
            this.scrollRef.scrollTo({
                top: 0
            });
        }, 100);
    }

    leave() {
        this.dialogRef.close(this.newStory);
    }
}
