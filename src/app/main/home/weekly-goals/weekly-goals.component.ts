import { ChangeDetectionStrategy, Component, Inject, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { WeeklyGoalsAnimations } from './weekly-goals.animations';
import { WeeklyGoalsHeaderComponent } from './weekly-goals-header/weekly-goals-header.component';
import { WeeklyGoalsItemComponent } from './weekly-goals-item/weekly-goals-item.component';
import { WeeklyGoalsModalComponent } from './weekly-goals-modal/weekly-goals-modal.component';
import { Timestamp } from '@angular/fire/firestore';
import { QuarterlyGoalData, WeeklyGoalData } from '../home.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccessState, User } from 'src/app/core/store/user/user.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { HashtagStore, LoadHashtag } from 'src/app/core/store/hashtag/hashtag.store';
import { LoadQuarterlyGoal, QuarterlyGoalStore } from 'src/app/core/store/quarterly-goal/quarterly-goal.store';
import { WeeklyGoalStore } from 'src/app/core/store/weekly-goal/weekly-goal.store';
import { getStartWeekDate } from 'src/app/core/utils/time.utils';

@Component({
  selector: 'app-weekly-goals',
  templateUrl: './weekly-goals.component.html',
  styleUrls: ['./weekly-goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WeeklyGoalsAnimations,
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    // Components
    WeeklyGoalsItemComponent,
    WeeklyGoalsHeaderComponent,
    WeeklyGoalsModalComponent,
  ],
})

export class WeeklyGoalsComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  readonly hashtagStore = inject(HashtagStore);
  readonly weeklyGoalStore = inject(WeeklyGoalStore);
  readonly quarterlyGoalStore = inject(QuarterlyGoalStore);
  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;

  // --------------- LOCAL UI STATE ----------------------

  /** Data for completed weekly goals. */
  completeWeeklyGoals: Signal<WeeklyGoalData[]> = computed(() => {
    const startOfWeek = getStartWeekDate();
    const completeGoals = this.weeklyGoalStore.selectEntities([
      ['__userId', '==', this.currentUser().__id],
      ['completed', '==', true],
      ['endDate', '>=', Timestamp.fromDate(startOfWeek)],
    ], { orderBy: 'order' });

    return completeGoals.map((goal) => {
      // get the quarter goal associated with that weekly goal to make updates easier
      const quarterGoal = this.quarterlyGoalStore.selectEntity(goal.__quarterlyGoalId);
      return Object.assign({}, goal, {
        hashtag: this.hashtagStore.selectEntity(quarterGoal?.__hashtagId),
        quarterGoal: quarterGoal,
      });
    });
  });

  /** Data for incomplete weekly goals. */
  incompleteWeeklyGoals: Signal<WeeklyGoalData[]> = computed(() => {
    const incompleteGoals = this.weeklyGoalStore.selectEntities([
      ['__userId', '==', this.currentUser().__id],
      ['completed', '==', false],
    ], { orderBy: 'order' });

    return incompleteGoals.map((goal) => {
      // get the quarter goal associated with that weekly goal to make updates easier
      const quarterGoal = this.quarterlyGoalStore.selectEntity(goal.__quarterlyGoalId);
      return Object.assign({}, goal, {
        hashtag: this.hashtagStore.selectEntity(quarterGoal?.__hashtagId),
        quarterGoal: quarterGoal,
      });
    });
  });

   /** All quarterly goals, needed for weekly goals modal */
  quarterlyGoals: Signal<Partial<QuarterlyGoalData>[]> = computed(() => {
    const allGoals = this.quarterlyGoalStore.selectEntities([
      ['__userId', '==', this.currentUser().__id],
    ], { orderBy: 'order' });

    return allGoals.map((goal) => {
      return Object.assign({}, goal, {
        hashtag: this.hashtagStore.selectEntity(goal.__hashtagId),
      });
    });
  });


  /** For storing the dialogRef in the opened modal. */
  dialogRef: MatDialogRef<any>;

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  /** Update weekly goal. */
  async checkGoal(goal: WeeklyGoalData) {
    try {
      await this.weeklyGoalStore.update(goal.__id, {
        completed: !goal.completed,
        ...(!goal.completed ? { endDate: Timestamp.now() } : {}),
      });
      this.snackBar.open(
          goal.completed ? 'Marked goal as incomplete' : 'Marked goal as complete',
          '',
          {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          },
      );
    } catch (e) {
      console.error(e);
      this.snackBar.open('Failed to update goal', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
  }

  /** Open add or edit goals modal for weekly goals. */
  openModal(editClicked: boolean) {
    this.dialogRef = this.dialog.open(WeeklyGoalsModalComponent, {
      height: '90%',
      position: { bottom: '0' },
      panelClass: 'goal-modal-panel',
      data: {
        goalDatas: this.quarterlyGoals(),
        incompleteGoals: this.incompleteWeeklyGoals(),
        updateWeeklyGoals: async (weeklyGoalsFormArray) => {
          try {
            await Promise.all(weeklyGoalsFormArray.controls.map(async (control, i) => {
              // if this is a new quarter goal
              if (!control.value.__weeklyGoalId) {
                await this.addNewGoal(control.value, i);
              // if it's a goal that's getting deleted
              } else if (control.value._deleted) {
                await this.removeGoal(control.value);
              // if it's a goal that's getting updated
              } else {
                await this.updateGoal(control.value, i);
              }
            }));
            this.snackBar.open(
              `Goals were updated`,
              '',
              {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
              },
            );
            this.dialogRef.close();
          } catch (e) {
            console.error(e);
          }
        },
      },
    });
  }

  // --------------- OTHER -------------------------------


  /** Adds a goal based off form values */
  async addNewGoal(controlValue, i) {
    // Add a quarterly goal
    await this.weeklyGoalStore.add(Object.assign({}, {
      __userId: this.currentUser().__id,
      __quarterlyGoalId: controlValue.__quarterlyGoalId,
      text: controlValue.text,
      completed: false,
      order: i + 1,
      _deleted: controlValue._deleted,
    }));
  }

  /** Removes some goal based off form values */
  async removeGoal(controlValue) {
    // no restrictions on deleting weekly goals, unlike quarterly goals
    await this.weeklyGoalStore.remove(controlValue.__weeklyGoalId);
  }

  /** Updates some goal based off form values */
  async updateGoal(controlValue, i) {
    // text or quarterly goal has changed, general update
    if (controlValue.originalText !== controlValue.text || controlValue.originalOrder !== i+1 || (!controlValue.originalQuarterlyGoalId && controlValue.__quarterlyGoalId)) {
      await this.weeklyGoalStore.update(controlValue.__weeklyGoalId, Object.assign({}, {
        __quarterlyGoalId: controlValue.__quarterlyGoalId,
        text: controlValue.text,
        order: i + 1,
        _deleted: controlValue._deleted,
      }));
    }
  }


  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {
    // loading uncompleted goals
    this.weeklyGoalStore.load([['__userId', '==', this.currentUser().__id], ['completed', '==', false]], { orderBy: "order" }, (wg) => [
      LoadQuarterlyGoal.create(this.quarterlyGoalStore, [['__id', '==', wg.__quarterlyGoalId]], {}, (qg) => [
        LoadHashtag.create(this.hashtagStore, [['__id', '==', qg.__hashtagId]], {}),
      ]),
    ]);

    // loading completed goals
    this.weeklyGoalStore.load([['__userId', '==', this.currentUser().__id], ['endDate', '>=', Timestamp.fromDate(getStartWeekDate())]], { orderBy: "order" }, (wg) => [
      LoadQuarterlyGoal.create(this.quarterlyGoalStore, [['__id', '==', wg.__quarterlyGoalId]], {}, (qg) => [
        LoadHashtag.create(this.hashtagStore, [['__id', '==', qg.__hashtagId]], {}),
      ]),
    ]);
  }
}
