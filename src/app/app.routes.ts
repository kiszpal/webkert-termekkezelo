import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {NapKozbeniArufelvetComponent} from './components/nap-kozbeni-arufelvet/nap-kozbeni-arufelvet.component';
import {NapVegiLeltarComponent} from './components/nap-vegi-leltar/nap-vegi-leltar.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './components/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], title: "Kezdőlap" },
  { path: 'nap-vegi-leltar', component: NapVegiLeltarComponent, canActivate: [AuthGuard], title: "Nap végi leltár" },
  { path: 'nap-kozbeni-arufelvet', component: NapKozbeniArufelvetComponent, canActivate: [AuthGuard], title: "Nap közbeni árufelvét" },
  { path: 'login', component: LoginComponent, title: "Bejelentkezés" },
  { path: 'register', component: RegisterComponent, title: 'Regisztráció' },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
1
