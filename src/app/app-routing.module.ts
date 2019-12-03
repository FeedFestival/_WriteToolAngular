import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { PolicyStaticComponent } from './features/policy/policy-static.component';


const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'privacy', component: PolicyStaticComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
