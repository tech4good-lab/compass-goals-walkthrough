import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { LandingComponent } from './first-time/landing/landing.component';
import { HomeComponent } from './main/home/home.component';

export const routes: Routes = [
  // General Routes
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: '', component: LandingComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
