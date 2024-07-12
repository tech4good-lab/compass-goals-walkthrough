import { inject, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { RoutingStateService } from './core/router/routing-state.service';
import { TimeAnalyticsService } from './core/analytics/time-analytics.service';
import { DetectRedeploymentService } from './shared/components/redeployment-warning/redeployment-warning.service';
import { AuthStore } from './core/store/auth/auth.store';
import { RedeploymentWarningComponent } from './shared/components/redeployment-warning/redeployment-warning.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    RedeploymentWarningComponent,
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  constructor(
    private router: Router,
    private routingState: RoutingStateService,
    private analytics: TimeAnalyticsService,
    private detectRedeployment: DetectRedeploymentService,
  ) {
  }

  ngOnInit() {
    // Load auth into store
    this.authStore.loadAuth();

    // Setup time analytics
    this.analytics.startTimeLogging();

    // Setup RoutingState to enable retrieving the previous Url
    this.routingState.loadRouting();

    // Make it so navigating to a new route scrolls back
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.getElementsByClassName('content-container')[0].scrollTop = 0;
    });

    // Continually check whether a new app version has been deployed.
    this.detectRedeployment.init();
  }
}
