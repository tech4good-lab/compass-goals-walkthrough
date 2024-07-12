import { Routes } from '@angular/router';
import { LandingComponent } from './general/landing/landing.component';
import { AuthGuard } from './core/auth/auth.guard';
import { HomeComponent } from './general/home/home.component';
import { LoginComponent } from './general/login/login.component';
import { WaitingComponent } from './onboarding/waiting/waiting.component';
import { ConsentComponent } from './onboarding/consent/consent.component';
import { WaitlistComponent } from './admin/waitlist/waitlist.component';

export const routes: Routes = [
  // Admin Routes
  { path: 'admin/waitlist', loadComponent: () => import('./admin/waitlist/waitlist.component')
      .then((mod) => mod.WaitlistComponent), canActivate: [AuthGuard] },
  // Onboarding Routes
  { path: 'onboarding/waiting', loadComponent: () => import('./onboarding/waiting/waiting.component')
      .then((mod) => mod.WaitingComponent), canActivate: [AuthGuard] },
  { path: 'onboarding/consent', loadComponent: () => import('./onboarding/consent/consent.component')
      .then((mod) => mod.ConsentComponent), canActivate: [AuthGuard] },
  // General Routes
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  // We intentionally do not add an AuthGuard here so you can always navigate there
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
