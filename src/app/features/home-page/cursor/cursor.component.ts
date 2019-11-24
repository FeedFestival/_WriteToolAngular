import { Component, OnInit, Input } from '@angular/core';
import {
    trigger, transition, state, animate, style, AnimationEvent
} from '@angular/animations';

const anim = {
    seconds: '0.7s'
}

@Component({
    selector: 'app-cursor',
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                height: '3px',
            })),
            state('closed', style({
                height: '1px',
            })),
            transition('open => closed', [
                animate(anim.seconds)
            ]),
            transition('closed => open', [
                animate(anim.seconds)
            ]),
            transition('* => closed', [
                animate(anim.seconds)
            ]),
            transition('* => open', [
                animate(anim.seconds)
            ]),
            transition('open <=> closed', [
                animate(anim.seconds)
            ]),
            transition('* => open', [
                animate(anim.seconds,
                    style({ opacity: '*' }),
                ),
            ]),
            transition('* => *', [
                animate(anim.seconds)
            ]),
        ]),
    ],
    templateUrl: './cursor.component.html',
    styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit {

    isOpen = true;

    @Input() logging = false;

    constructor() { }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    close() {
        setTimeout(() => {
            this.isOpen = false;
        });
    }

    open() {
        setTimeout(() => {
            this.isOpen = true;
        });
    }

    ngOnInit() {
        // this.overTime();
    }

    overTime() {
        setTimeout(() => {
            this.toggle();
            this.overTime();
        }, 1000);
    }

    onAnimationEnd(event: AnimationEvent) {
        if (this.isOpen === false)  {
            this.open();
        }
    }

    onAnimationEvent(event: AnimationEvent) {
        if (!this.logging) {
            return;
        }
        // openClose is trigger name in this example
        console.warn(`Animation Trigger: ${event.triggerName}`);

        // phaseName is start or done
        console.warn(`Phase: ${event.phaseName}`);

        // in our example, totalTime is 1000 or 1 second
        console.warn(`Total time: ${event.totalTime}`);

        // in our example, fromState is either open or closed
        console.warn(`From: ${event.fromState}`);

        // in our example, toState either open or closed
        console.warn(`To: ${event.toState}`);

        // the HTML element itself, the button in this case
        console.warn(`Element: ${event.element}`);
    }
}
