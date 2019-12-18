import { Component, OnInit, ViewChild } from '@angular/core';
import { PageDialogComponent } from 'src/app/shared/components/page-dialog/page-dialog.component';
import { MatDialogRef, MatSelect } from '@angular/material';
import { NgScrollbar } from 'ngx-scrollbar';
import { ElementsService } from '../element/elements.service';
import { LocalStorageService } from 'ngx-webstorage';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-story-dialog',
    templateUrl: './story-dialog.component.html',
    styleUrls: ['./story-dialog.component.scss']
})
export class StoryDialogComponent implements OnInit {

    stories: any[] = [
        { id: '', name: 'New Story' }
    ];

    newStory: any = {};
    isStorySelected = false;

    @ViewChild('NgScrollbar', { static: true }) scrollRef: NgScrollbar;
    
    animalControl = new FormControl(''/*, [Validators.required]*/);

    constructor(
        public dialogRef: MatDialogRef<PageDialogComponent>,
        private elementsService: ElementsService,
        private localStorage: LocalStorageService,
    ) {

    }

    ngOnInit() {
        this.scrollToTop();

        this.stories = JSON.parse(this.localStorage.retrieve('stories'));

        if (this.stories.length === 1) {
            this.onChange({value: this.stories[0].id});
        } else {
            this.animalControl.setValue(null);
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

        this.isStorySelected = true;
    }

    save() {

        if (this.newStory.isNew) {
            this.newStory.isNew = false;
            this.stories.push(JSON.parse(JSON.stringify(this.newStory)));
        }

        this.localStorage.store('stories', JSON.stringify(this.stories));
        const lastIndex = this.stories.length - 1;
        this.animalControl.setValue(this.stories[lastIndex]);
        this.onChange({value: this.stories[lastIndex].id});
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
