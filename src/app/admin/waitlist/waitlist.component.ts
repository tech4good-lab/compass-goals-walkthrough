import { Component, OnInit, ChangeDetectionStrategy, inject, effect, computed, Signal, Injector } from '@angular/core';
import { WaitlistAnimations } from './waitlist.animations';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { withLatestFrom, takeUntil } from 'rxjs/operators';
import { User, AccessState } from '../../core/store/user/user.model';
import { AuthStore } from '../../core/store/auth/auth.store';
import { UserStore } from '../../core/store/user/user.store';
import { CachedListenersService } from '../../core/firebase/cached-listeners.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createId } from '../../core/utils/rand.utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgFor } from '@angular/common';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

// If you add other columns, update this, e.g. AccessState | string | boolean;
type UpdateValueTypes = AccessState;

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WaitlistAnimations,
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatMenuTrigger,
    MatMenu,
    NgFor,
    MatMenuItem,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
  ],
})
export class WaitlistComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  readonly userStore = inject(UserStore);

  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  /** Access options for menu sorted alphabetically. */
  accessOptions: AccessState[] = Object.keys(AccessState)
    .map((k) => AccessState[k] as AccessState)
    .sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });

  /** Columns to display in the table */
  displayedColumns = ['userName', 'accessState'];

  // --------------- COMPUTED DATA -----------------------

  /** Get array of all waiting users. */
  waitingUsers: Signal<User[]> = computed(() => this.userStore.selectEntities([], { orderBy: 'accessState' }));

  // --------------- EVENT HANDLING ----------------------

  /** Event stream for updating user accessState. */
  async updateState(user: User, key: string, value: UpdateValueTypes) {
    const data = {};
    data[key] = value;

    try {
      await this.userStore.update(user.__id, { ...data });
      this.snackBar.open(`Set ${user.name}'s ${key} to ${value}`, '', { duration: 3000 });
    } catch (e) {
      console.error(e);
      this.snackBar.open('Failed to submit response', '', { duration: 3000 });
    }
  }

  // --------------- OTHER -------------------------------

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cachedListeners: CachedListenersService,
    private injector: Injector,
  ) {
  }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit() {
    this.userStore.load([], {});
  }
}
