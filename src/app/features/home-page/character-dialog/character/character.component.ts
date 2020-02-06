import { Component, Input, OnInit } from '@angular/core';

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
    ) {
    }

    ngOnInit() {
        console.log(this.elementId);
    }

    onChange(event) {

    }

    save() {

    }
}
