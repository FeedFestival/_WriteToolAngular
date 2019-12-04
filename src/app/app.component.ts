import { Component, ViewChild, NgZone, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ElementsService } from './features/home-page/element/elements.service';
import { NgcCookieConsentService, NgcInitializeEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from 'ngx-cookieconsent';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    title = 'asl-pls';

    faArrowCircleUp = faArrowCircleUp;
    faBars = faBars;

    // Stream that will update title font size on scroll down
    scrollClass = '';

    //keep refs to subscriptions to be able to unsubscribe later
    private popupOpenSubscription: Subscription;
    private popupCloseSubscription: Subscription;
    private initializeSubscription: Subscription;
    private statusChangeSubscription: Subscription;
    private revokeChoiceSubscription: Subscription;
    private noCookieLawSubscription: Subscription;

    // Unsubscriber for elementScrolled stream.
    private scrollSubscription = Subscription.EMPTY;

    // Get NgScrollbar reference
    @ViewChild('NgScrollbar', { static: false }) scrollRef: NgScrollbar;

    constructor(
        private ngZone: NgZone,
        private ccService: NgcCookieConsentService,
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

    ngOnInit() {
        // subscribe to cookieconsent observables to react to main events
        this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.initializeSubscription = this.ccService.initialize$.subscribe(
            (event: NgcInitializeEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
            (event: NgcStatusChangeEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
            (event: NgcNoCookieLawEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
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

    showMenu() {
        this.scrollClass = 'med';
    }

    ngOnDestroy() {
        this.scrollSubscription.unsubscribe();
        // unsubscribe to cookieconsent observables to prevent memory leaks
        this.popupOpenSubscription.unsubscribe();
        this.popupCloseSubscription.unsubscribe();
        this.initializeSubscription.unsubscribe();
        this.statusChangeSubscription.unsubscribe();
        this.revokeChoiceSubscription.unsubscribe();
        this.noCookieLawSubscription.unsubscribe();
    }
}
