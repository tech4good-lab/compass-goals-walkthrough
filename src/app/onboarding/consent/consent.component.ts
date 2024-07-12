import { Component, OnInit, ChangeDetectionStrategy, Signal, inject, Injector } from '@angular/core';
import { ConsentAnimations } from './consent.animations';
import { Router, ParamMap, ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { withLatestFrom, filter, take, takeUntil } from 'rxjs/operators';
import { User, AccessState } from '../../core/store/user/user.model';
import { Location, PlatformLocation } from '@angular/common';
import { AuthStore } from '../../core/store/auth/auth.store';
import { UserStore } from '../../core/store/user/user.store';
import { CachedListenersService } from '../../core/firebase/cached-listeners.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createId } from '../../core/utils/rand.utils';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: ConsentAnimations,
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatCheckbox,
  ],
})
export class ConsentComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  readonly userStore = inject(UserStore);

  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;

  // --------------- LOCAL UI STATE ----------------------

  /** Constants for onboarding templates. */
  appName = 'Compass';
  shortProdDesc = 'provides users with support for setting goals, reflecting on how short-term goals connect to long-term ones, and in the future, for obtaining career mentorship';
  shortResearchDesc = 'how to support goal setting and career mentorship';
  authAppName = 'Google';
  protocolNumber = 'PROTOCOL_NO';
  protocolTitle = 'PROTOCOL_TITLE';
  usageDataProductDesc = 'help users set and reflect on goals. When you participate in mentorship cohorts, the goals you specify will be shared with the mentor';
  usageDataResearchDesc = 'how to better support goal setting and career mentorship';
  studyDoingDesc = 'When you participate in our study, you will use our platform to set and reflect on goals, and participate in mentorship cohorts. You will also fill out a survey on your experience, and optionally, participate in a follow-up interview';
  benefitsDesc = 'to engage in intentional goal setting';
  investigatorInfo = '[FirstName LastName, co-Principal Investigator, email@ucsc.edu]';
  facultyInfo = 'David T. Lee, dlee105@ucsc.edu';

  /** Checkbox state used in form. */
  checked: boolean;

  /** Consent url. */
  consentUrl;

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  /** Submit the consent form. */
  async submit() {
    try {
      await this.userStore.update(this.currentUser().__id, {
        accessState: AccessState.SUBMIT_INTEREST,
        consented: true,
      });
      this.router.navigate(['/onboarding/waiting']);
    } catch (e) {
      console.error(e);
      this.snackBar.open('Failed to update consent status', '', { duration: 3000 });
    }
  }

  // --------------- OTHER -------------------------------

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private platform: PlatformLocation,
    private location: Location,
    private cachedListeners: CachedListenersService,
    private injector: Injector,
  ) {
  }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit() {
    this.consentUrl = location.origin + '/' + this.location.prepareExternalUrl('consent');
  }
}
