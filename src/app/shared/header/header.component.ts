import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { faCoffee, faEnvelope, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { EditState } from 'src/app/app.constants';
import { ElementsService } from 'src/app/features/home-page/element/elements.service';
import { StoryDialogComponent } from 'src/app/features/home-page/story-dialog/story-dialog.component';
import { PageDialogComponent } from 'src/app/shared/components/page-dialog/page-dialog.component';
import { NavigationService } from '../navigation/navigation.service';
import { OnResizeService } from '../on-resize/on-resize.service';
import { HeaderService } from './header.service';

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

    bp: string;

    /*
    the tool file options
    */
    saveClass: string;
    storyName: string;

    constructor(
        private router: Router,
        private authService: AuthService,
        private matDialog: MatDialog,
        private headerService: HeaderService,
        private elementsService: ElementsService,
        private navigationService: NavigationService,
        private onResizeService: OnResizeService
    ) {
        onResizeService.getResizeEvent()
            .subscribe((bp) => {
                this.bp = bp;
            });

        this.elementsService.getStoryNameEventEvent()
            .subscribe((storyName) => {
                this.storyName = storyName;
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

    editStory() {

        this.navigationService.emitEditStateEvent(EditState.DEFAULT);

        const dialogRef = this.matDialog.open(StoryDialogComponent);
        dialogRef.afterClosed()
            .subscribe((story) => {
                this.elementsService.emitStoryChange(story);
                this.navigationService.emitEditStateEvent(EditState.MAIN);
            });
    }

    save() {
        this.headerService.emitSaveEvent();
        this.saveClass = '';
    }
}
