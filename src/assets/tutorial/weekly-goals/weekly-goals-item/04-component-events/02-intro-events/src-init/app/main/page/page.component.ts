import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../core/store/app.reducer';
import * as fromAuth from '../../core/store/auth/auth.reducer';
import { PageAnimations } from './page.animations';
import { FirebaseService } from '../../core/firebase/firebase.service';
import { tap, filter, withLatestFrom, take, takeUntil, map, subscribeOn } from 'rxjs/operators';
import { of, distinctUntilChanged, interval, Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { User } from '../../core/store/user/user.model';
import { PageSelectors } from './+state/page.selectors';
import { QuarterData, QuarterGoalInForm } from './+state/page.model';
import { LoadData, Cleanup } from './+state/page.actions';
import { ActionFlow, RouterNavigate } from '../../core/store/app.actions';
import { UpdateUser } from '../../core/store/user/user.actions';
import { QuarterGoalActionTypes, UpdateQuarterGoal } from '../../core/store/quarter-goal/quarter-goal.actions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { ShowSnackbar } from '../../core/snackbar/snackbar.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: PageAnimations,
})
export class PageComponent implements OnInit, OnDestroy {
  // --------------- ROUTE PARAMS & CURRENT USER ---------


  // --------------- LOCAL AND GLOBAL STATE --------------


  // --------------- DB ENTITY DATA ----------------------

  /** Container id for selectors and loading. */
  containerId: string = this.db.createId();

  // --------------- DATA BINDING ------------------------


  // --------------- EVENT BINDING -----------------------

  /** Function for showing snackbar on append */
  showSnackbar(message: string): void {
    this.store.dispatch(new ShowSnackbar({
      message: message,
      config: { duration: 3000 },
    }));
  }

  // --------------- HELPER FUNCTIONS AND OTHER ----------


  /** Unsubscribe observable for subscriptions. */
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private selectors: PageSelectors,
    private store: Store<fromStore.State>,
    private db: FirebaseService,
  ) {
  }

  ngOnInit() {
    // --------------- EVENT HANDLING ----------------------


    // --------------- LOAD DATA ---------------------------
  }

  ngOnDestroy() {
    // Unsubscribe subscriptions.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    // Unsubscribe from firebase connection from load and free up memoized selector values.
    this.store.dispatch(new Cleanup(this.containerId));
    this.selectors.cleanup(this.containerId);
  }
}
