import { Component, OnInit, ChangeDetectionStrategy, inject, Signal, Injector } from '@angular/core';
import { LandingAnimations } from './landing.animations';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { withLatestFrom, filter, take, takeUntil } from 'rxjs/operators';
import { User } from '../../core/store/user/user.model';
import { AuthStore } from '../../core/store/auth/auth.store';

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
