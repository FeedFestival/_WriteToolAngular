import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgScrollbar } from 'ngx-scrollbar';
import { PageDialogComponent } from 'src/app/shared/components/page-dialog/page-dialog.component';
import { ElementsService } from '../element/elements.service';
import { StoryService } from '../story.service';
import { WriteToolUtils } from '../story.utils';

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
        private storyService: StoryService
    ) {
    }

    ngOnInit() {
        this.scrollToTop();
        this.getStories();
    }

    getStories(selectLastAdded?) {
        this.stories = [
            { id: '', name: 'New Story' }
        ];

        this.storyService.getAll()
            .subscribe((stories) => {
                if (!stories) {
                    stories = [];
                }
                this.stories = [...this.stories, ...stories];

                if (selectLastAdded) {
                    const lastIndex = this.stories.length - 1;
                    this.selected = this.stories[lastIndex].id;
                    this.onChange({ value: this.stories[lastIndex].id });
                } else {
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
            });
    }

    ngAfterViewInit() {
        this.scrollToTop();
    }

    onChange(event) {
        let story = this.storyService.getStoryObject(event.value);
        if (story.id.length === 0) {
            if (this.newStory && this.newStory.isNew) {
                return;
            }
            this.newStory = {
                id: WriteToolUtils.guid(),
                name: 'Untitled',
                isNew: true,
                guid: WriteToolUtils.guid(),
                description: ''
            };
            story = this.newStory;
            this.stories.push(this.newStory);
        } else {
            this.newStory = this.stories.find(s => this.storyService.storiesEqual(s, story));
        }
        const storyIndex = this.stories.findIndex(s => this.storyService.storiesEqual(s, story));
        if (storyIndex >= 0) {
            this.selected = this.stories[storyIndex].id;
            this.isStorySelected = true;
        }
    }

    save() {
        this.storyService.saveStory(this.newStory)
            .subscribe(storyId => {
                this.newStory.id = storyId;
                this.newStory.isNew = false;

                if (this.storyService.isLoggedIn === false) {
                    this.getStories(true);
                }
            });
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
