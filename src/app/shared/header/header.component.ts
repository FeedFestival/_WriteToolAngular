import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { faCoffee, faEnvelope, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { PageDialogComponent } from 'src/app/shared/components/page-dialog/page-dialog.component';
import { HeaderService } from './header.service';
import { OnResizeService } from '../on-resize/on-resize.service';

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

    resizeType: string;

    /*
    the tool file options
    */
    saveClass: string;

    constructor(
        private router: Router,
        private authService: AuthService,
        private matDialog: MatDialog,
        private headerService: HeaderService,
        private onResizeService: OnResizeService
    ) {
        onResizeService.getResizeEvent()
            .subscribe((resizeType) => {
                this.resizeType = resizeType;
            });
    }

    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            // console.log(this.user);
        });

        this.headerService.getCanSaveEvent()
            .subscribe((canSave) => {
                this.saveClass = canSave ? 'can-save' : '';
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

    openPage(pageOption) {

        const newArgs = {};
        newArgs[pageOption] = true;

        const dialogRef = this.matDialog.open(PageDialogComponent, {
            data: {
                args: newArgs
            }
        });
    }

    save() {
        this.headerService.emitSaveEvent();
        this.saveClass = '';
    }
}
