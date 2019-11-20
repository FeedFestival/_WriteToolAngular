import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { faCoffee, faEnvelope, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input() scrollClass = '';

    faCoffee = faCoffee;
    faEnvelope = faEnvelope;
    faShoppingCart = faShoppingCart;
    faHeart = faHeart;

    user: SocialUser;
    loggedIn: boolean;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            console.log(this.user);
        });
    }

    login() {
        if (this.loggedIn) {
            return;
        }
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authService.signOut();
    }

    goHome() {
        this.router.navigateByUrl('/acasa');
    }
}
