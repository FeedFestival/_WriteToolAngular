import { Component, ViewChild, NgZone, OnDestroy, AfterViewInit } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { ElementsService } from './features/home-page/element/elements.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {

    title = 'asl-pls';

    faArrowCircleUp = faArrowCircleUp;

    // Stream that will update title font size on scroll down
    scrollClass = '';

    // Unsubscriber for elementScrolled stream.
    private scrollSubscription = Subscription.EMPTY;

    // Get NgScrollbar reference
    @ViewChild('NgScrollbar', { static: false }) scrollRef: NgScrollbar;

    constructor(
        private ngZone: NgZone,
        private elementsService: ElementsService,
        router: Router
    ) {
        router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            filter(() => !!this.scrollRef),
            tap((event: NavigationEnd) => this.scrollToTop())
        ).subscribe();

        elementsService.getScrollToElementEmitter()
            .subscribe((element) => {
                this.scrollRef.scrollToElement(element, { duration: 500, top: -((document.documentElement.clientHeight / 2) - 100) });
            });
    }

    ngAfterViewInit() {
        this.scrollSubscription = this.scrollRef.verticalScrolled.pipe(
            map((e: any) => {

                // console.log('TCL: AppComponent -> ngAfterViewInit -> e.target.scrollTop', e.target.scrollTop);
                if (e.target.scrollTop < 150) {
                    return 'max';
                } else if (e.target.scrollTop > 150 && e.target.scrollTop < 333) {
                    return 'med';
                } else if (e.target.scrollTop > 333) {
                    return 'min';
                }
            }),
            tap((scrollClass: string) => this.ngZone.run(
                () => {
                    this.scrollClass = scrollClass;
                })
            )
        ).subscribe();
    }

    scrollToTop() {
        this.scrollRef.scrollTo({
            top: 0
        });
    }

    ngOnDestroy() {
        this.scrollSubscription.unsubscribe();
    }
}
