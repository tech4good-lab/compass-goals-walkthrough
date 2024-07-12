import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, computed, inject, signal, WritableSignal, Signal, Injector } from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WaitingAnimations } from './waiting.animations';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Observable, Subject, from, BehaviorSubject, combineLatest } from 'rxjs';
import { withLatestFrom, mergeMap, map, tap, filter, take, takeUntil } from 'rxjs/operators';
import { WaitlistData } from './waiting.model';
import { User, AccessState } from '../../core/store/user/user.model';
import { UserContext } from '../../core/store/user-context/user-context.model';
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CachedListenersService } from '../../core/firebase/cached-listeners.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthStore } from '../../core/store/auth/auth.store';
import { UserStore } from '../../core/store/user/user.store';
import { UserContextStore } from '../../core/store/user-context/user-context.store';
import { createId } from '../../core/utils/rand.utils';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatLabel, MatFormField, MatHint } from '@angular/material/form-field';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WaitingAnimations,
  standalone: true,
  imports: [
    FormsModule,
    MatLabel,
    ReactiveFormsModule,
    NgFor,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatHint,
    MatProgressSpinner,
    AsyncPipe,
  ],
})
export class WaitingComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  readonly userStore = inject(UserStore);
  readonly userContextStore = inject(UserContextStore);

  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;

  // --------------- LOCAL UI STATE ----------------------

  /** Loading indicator. */
  loading: WritableSignal<boolean> = signal(false);

  // this allows the template to use the enum
  AccessState = AccessState;

  // Template constants
  appName = 'Compass';
  appArea = 'goal setting';
  backgroundAndInterestsOptions = [
    { fieldName: 'option1', label: 'Student', ariaLabel: 'OPTION_1_ARIA' },
    { fieldName: 'option2', label: 'Professional', ariaLabel: 'OPTION_2_ARIA' },
    { fieldName: 'option3', label: 'Homemaker', ariaLabel: 'OPTION_3_ARIA' },
    { fieldName: 'other', label: 'Other (none are a perfect fit)', ariaLabel: 'Other' },
  ];
  outreachLeadName = 'David Lee';
  outreachLeadEmail = 'dlee105@ucsc.edu';

  // Form variables
  desiredValue = '';
  backgroundOther = '';
  backgroundSelections = this.form.group({
    option1: false,
    option2: false,
    option3: false,
    other: false,
  });

  // --------------- COMPUTED DATA -----------------------

  /** Waitlist data from app-state, user, and user-context. */
  waitlistData: Signal<WaitlistData> = computed(() => {
    const userContext = this.userContextStore.selectFirst([['__userId', '==', this.currentUser().__id]], {});
    return { currentUser: this.currentUser(), userContext };
  });

  /** Waiting position number. */
  positionText$: Observable<string> = toObservable(this.currentUser).pipe(
    filter((user: User) => !!user.joinedWaitlistAt),
    mergeMap(async (user) => {
      const posNum = await this.userStore.count([
        ['joinedWaitlistAt', '<=', user.joinedWaitlistAt],
        ['accessState', '<', AccessState.DONE],
      ], {});
      return this.nth(posNum);
    }),
  );

  /** Waiting position number. */
  totalWaiting$: Observable<string> = toObservable(this.currentUser).pipe(
    filter((user: User) => !!user.joinedWaitlistAt),
    mergeMap(async (user) => {
      const total = await this.userStore.count([
        ['accessState', '<', AccessState.DONE],
      ], {});
      return `${total}`;
    }),
  );

  /** Function for adding the appropriate suffix. */
  nth(n: number): string {
    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  }

  /** Get all options that were selected. */
  getSelections(): string[] {
    return Object.keys(this.backgroundSelections.value).filter((key) => this.backgroundSelections.value[key]);
  }

  // --------------- EVENT HANDLING ----------------------

  /** Submit background and interests. */
  async submitInterest() {
    try {
      await this.userStore.update(this.waitlistData().currentUser.__id, {
        accessState: AccessState.SUBMIT_DETAILED,
      });

      if (this.waitlistData().userContext) {
        this.userContextStore.update(this.waitlistData().userContext.__id, {
          background: {
            selections: this.getSelections(),
            ...(this.backgroundOther ? { other: this.backgroundOther } : { }),
          },
          desiredValue: this.desiredValue,
        });
      } else {
        this.userContextStore.add({
          __userId: this.waitlistData().currentUser.__id,
          background: {
            selections: this.getSelections(),
            ...(this.backgroundOther ? { other: this.backgroundOther } : { }),
          },
          desiredValue: this.desiredValue,
        });
      }
    } catch (e) {
      console.error(e);
      this.snackBar.open('Failed to submit response', '', { duration: 3000 });
    }
  }

  /** Submit detailed information. */
  async submitDetailed() {
    try {
      await this.userStore.update(this.waitlistData().currentUser.__id, {
        accessState: AccessState.WAITING,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        joinedWaitlistAt: serverTimestamp() as any,
      });

      this.userContextStore.update(this.waitlistData().userContext.__id, {
        // Add relevant fields from detailed responses
      });
    } catch (e) {
      console.error(e);
      this.snackBar.open('Failed to submit response', '', { duration: 3000 });
    }
  }

  // --------------- OTHER -------------------------------

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private form: FormBuilder,
    private cachedListeners: CachedListenersService,
    private injector: Injector,
  ) {
  }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit() {
    this.userContextStore.load([['__userId', '==', this.currentUser().__id]], {});
  }
}
