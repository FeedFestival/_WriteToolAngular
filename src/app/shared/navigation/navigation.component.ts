import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

    private accountUpdatedSub: Subscription;
    private subscription: Subscription;

    constructor(
        private router: Router,
        // private stateStorageService: StateStorageService,
        // private accountService: AccountService
    ) {
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                
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
