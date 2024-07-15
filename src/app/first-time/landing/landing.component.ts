import { Component, OnInit, ChangeDetectionStrategy, inject, Signal, Injector } from '@angular/core';
import { LandingAnimations } from './landing.animations';
import { User } from 'src/app/core/store/user/user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthStore } from 'src/app/core/store/auth/auth.store';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: LandingAnimations,
  standalone: true,
})
export class LandingComponent implements OnInit {
  readonly authStore = inject(AuthStore);

  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  /** Login the user. */
  login() {
    this.authStore.login('google.com');
  }

  // --------------- OTHER -------------------------------

  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
  ) {
  }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit() {
  }
}