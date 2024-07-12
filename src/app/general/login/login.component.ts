import { inject, effect, Component, OnInit, ChangeDetectionStrategy, Signal } from '@angular/core';
import { User } from '../../core/store/user/user.model';
import { AuthStore } from '../../core/store/auth/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoginComponent implements OnInit {
  authStore = inject(AuthStore);

  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  /** Login the user. */
  login() {
    this.authStore.login('google.com', { doNotRoute: true });
  }

  /** Logout the user. */
  logout() {
    this.authStore.logout({ doNotRoute: true });
  }

  // --------------- OTHER -------------------------------

  constructor() {
  }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit() {
  }
}
