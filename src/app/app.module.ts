import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatInputModule, MatMenuModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthServiceConfig, FacebookLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursorComponent } from './features/home-page/cursor/cursor.component';
import { ElementComponent } from './features/home-page/element/element.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LegalDocsComponent } from './features/policy/legal-documents.component';
import { PageDialogComponent } from './shared/components/page-dialog/page-dialog.component';
import { ContactComponent } from './features/contact/contact.component';
import { AboutComponent } from './features/about/about.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { TermsComponent } from './features/policy/terms/terms.component';
import { PrivacyComponent } from './features/policy/privacy/privacy.component';
import { CookiesComponent } from './features/policy/cookies/cookies.component';
import { SnsComponent } from './features/policy/sns/sns.component';
import { GdprComponent } from './features/policy/gdpr/gdpr.component';

const config = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('2520604091369887')
    }
]);

export function provideConfig() {
    return config;
}

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HeaderComponent,
        FooterComponent,
        NavigationComponent,
        ElementComponent,
        CursorComponent,
        PageDialogComponent,
        LegalDocsComponent,
        ContactComponent,
        AboutComponent,
        TermsComponent,
        PrivacyComponent,
        CookiesComponent,
        SnsComponent,
        GdprComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        SocialLoginModule,
        CKEditorModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatInputModule,
        MatCheckboxModule,
        MatDialogModule,
        FormsModule,
        FontAwesomeModule,
        NgScrollbarModule,
        CommonModule,
        TransferHttpCacheModule,
        HttpClientModule,
        NgtUniversalModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatDividerModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule
    ],
    entryComponents: [
        PageDialogComponent
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
