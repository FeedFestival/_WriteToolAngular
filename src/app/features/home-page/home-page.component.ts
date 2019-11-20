import { Component, OnInit } from '@angular/core';
import { ElementType } from 'src/app/app.constants';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    ElementTypeRef = ElementType;

    elements: any[] = [
        {
            type: ElementType.SCENE_HEADING,
            text: 'INT. UNKNOWN LOCATION'
        },
        {
            type: ElementType.ACTION,
            text: 'Some kids are going to camping'
        },
        {
            type: ElementType.CHARACTER,
            text: 'Unknown'
        },
        {
            type: ElementType.DIALOG,
            text: '...'
        },
    ];

    constructor() { }

    ngOnInit() {

        let id = 1;
        this.elements.forEach(e => {
            e.id = id;
            e.inputClass = ElementType.getInputClass(e.type);
            e.typeClass =  ElementType.getTypeClass(e.type);
            id++;
        });
        
        console.log("TCL: HomePageComponent -> ngOnInit -> this.elements", this.elements)
        
        this.elements.push({
            type: ElementType.CURSOR
        });
    }

    onEdit() {

        
    }

    onChange(index) {
        const element = this.elements[index];
        if (!element.text || element.text.length === 0) {
            element.inputClass += ' input-empty';
        } else {
            element.inputClass = element.inputClass.replace(/ input-empty/g,'');
        }

        console.log("TCL: HomePageComponent -> ngOnInit -> this.elements", this.elements)
    }

}
