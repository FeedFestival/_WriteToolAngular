import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from './navigation.service';
import { ElementsService } from 'src/app/features/home-page/element/elements.service';
import { MainAvailableKeys, EditState, TextAvailableKeys, NewAvailableKeys } from 'src/app/app.constants';
import { OnResizeService } from '../on-resize/on-resize.service';
import { INITIAL_CONFIG } from '@angular/platform-server';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

    private accountUpdatedSub: Subscription;
    private subscription: Subscription;

    availableKeys: any[];

    currentState: string;
    bp: string;

    constructor(
        private router: Router,
        private navigationService: NavigationService,
        private elementsService: ElementsService,
        private onResizeService: OnResizeService
        // private stateStorageService: StateStorageService,
        // private accountService: AccountService
    ) {
        onResizeService.getResizeEvent()
            .subscribe((bp) => {
                this.bp = bp;
                this.init();
            });
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {

            }
        });

        this.navigationService.getEditStateEmitter()
            .subscribe((editState) => {
                this.currentState = editState;
                this.init();
            });
    }

    init() {
        if (!this.currentState) {
            return;
        }

        switch (this.currentState) {
            case EditState.NEW:
                setTimeout(() => {
                    const newAvailableKeys = JSON.parse(JSON.stringify(NewAvailableKeys));
                    const allowedElements = this.elementsService.getAllowedElements();
                    this.availableKeys = newAvailableKeys.filter((nAK) => {
                        if (allowedElements.includes(nAK.id)) {
                            return nAK;
                        }
                    });
                });
                break;
            case EditState.TEXT:
                this.availableKeys = TextAvailableKeys;
                break;
            default:
                this.availableKeys = MainAvailableKeys;
                break;
        }
        this.availableKeys = this.availableKeys.filter(ak => {
            return this.bp === 'xs' && ak.code;
        });
    }

    ngOnDestroy() {
        if (this.accountUpdatedSub) {
            this.accountUpdatedSub.unsubscribe();
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    doAction(code) {
        if (!code) {
            return;
        }

        this.navigationService.emitClickNavEvent(code);
    }
}
