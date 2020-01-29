import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { LocalStorageService } from 'ngx-webstorage';
import { ElementsService } from '../../element/elements.service';

@Component({
    selector: 'app-character',
    templateUrl: './character.component.html',
    // styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

    // stories: any[];

    // selected: string;
    // newStory: any = {};
    // isStorySelected = false;

    @Input() elementId = 'test';

    constructor(
        private elementsService: ElementsService,
        private localStorage: LocalStorageService
    ) {
    }

    ngOnInit() {
        console.log(this.elementId);
    }

    onChange(event) {

        // if (event.value.length === 0) {
        //     this.newStory = {
        //         id: this.elementsService.guid(),
        //         name: '',
        //         isNew: true
        //     };

        // } else {
        //     this.newStory = this.stories.find(s => s.id === event.value);
        // }

        // this.isStorySelected = true;
    }

    save() {

        // if (this.newStory.isNew) {
        //     this.newStory.isNew = false;
        //     this.stories.push(JSON.parse(JSON.stringify(this.newStory)));
        // }

        // this.localStorage.store('stories', JSON.stringify(this.stories));
        // const lastIndex = this.stories.length - 1;
        // this.selected = this.stories[lastIndex].id;
        // this.onChange({ value: this.stories[lastIndex].id });
    }
}
