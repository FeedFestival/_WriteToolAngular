import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { LegalDocsComponent } from './features/policy/legal-documents.component';
import { ContactComponent } from './features/contact/contact.component';
import { AboutComponent } from './features/about/about.component';
import { TermsComponent } from './features/policy/terms/terms.component';
import { PrivacyComponent } from './features/policy/privacy/privacy.component';
import { CookiesComponent } from './features/policy/cookies/cookies.component';
import { SnsComponent } from './features/policy/sns/sns.component';


const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'legal', component: LegalDocsComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'cookies', component: CookiesComponent },
    { path: 'sns', component: SnsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
