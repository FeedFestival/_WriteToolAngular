import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDividerModule, MatMenuModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthServiceConfig, FacebookLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FormsModule } from '@angular/forms';

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
        NavigationComponent
    ],
    imports: [
        BrowserModule,
        SocialLoginModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatInputModule,
        FormsModule,
        FontAwesomeModule,
        NgScrollbarModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatDividerModule,
        MatInputModule,
        FormsModule
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
