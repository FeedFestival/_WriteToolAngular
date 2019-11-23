import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from './navigation.service';
import { ElementsService } from 'src/app/features/home-page/element/elements.service';
import { MainAvailableKeys, EditState, TextAvailableKeys, NewAvailableKeys } from 'src/app/app.constants';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

    private accountUpdatedSub: Subscription;
    private subscription: Subscription;

    availableKeys: any[];

    constructor(
        private router: Router,
        private navigationService: NavigationService,
        private elementsService: ElementsService
        // private stateStorageService: StateStorageService,
        // private accountService: AccountService
    ) {
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {

            }
        });

        this.navigationService.getEditStateEmitter()
            .subscribe((editState) => {
                switch (editState) {
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

    onNavigate(route: string) {
        this.router.navigateByUrl(route);
    }

    logout() {
        this.onNavigate('/logout');
    }
}
