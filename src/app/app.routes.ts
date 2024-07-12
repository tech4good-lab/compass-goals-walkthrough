import { Routes } from '@angular/router';
import { LandingComponent } from './general/landing/landing.component';
import { AuthGuard } from './core/auth/auth.guard';
import { HomeComponent } from './general/home/home.component';
import { LoginComponent } from './general/login/login.component';

export const routes: Routes = [
  // General Routes
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  // We intentionally do not add an AuthGuard here so you can always navigate there
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
