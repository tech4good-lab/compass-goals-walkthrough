import { ChangeDetectionStrategy, Component, computed, Inject, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { WeeklyGoalsAnimations } from './weekly-goals.animations';
import { WeeklyGoalsItemComponent } from './weekly-goals-item/weekly-goals-item.component';
import { QuarterlyGoalData, WeeklyGoalData } from '../home.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WeeklyGoalsHeaderComponent } from "./weekly-goals-header/weekly-goals-header.component";
import { User } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { HashtagStore, LoadHashtag } from 'src/app/core/store/hashtag/hashtag.store';
import { QuarterlyGoalStore, LoadQuarterlyGoal } from 'src/app/core/store/quarterly-goal/quarterly-goal.store';
import { WeeklyGoalStore } from 'src/app/core/store/weekly-goal/weekly-goal.store';
import { getStartWeekDate } from 'src/app/core/utils/time.utils';
import { WeeklyGoalsModalComponent } from './weekly-goals-modal/weekly-goals-modal.component';
import { BATCH_WRITE_SERVICE, BatchWriteService } from 'src/app/core/store/batch-write.service';

@Component({
  selector: 'app-weekly-goals',
  templateUrl: './weekly-goals.component.html',
  styleUrls: ['./weekly-goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WeeklyGoalsAnimations,
  standalone: true,
  imports: [
    /** Components */
    WeeklyGoalsHeaderComponent,
    WeeklyGoalsItemComponent,
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

  /** Loading icon. */
  loading: WritableSignal<boolean> = signal(false);

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  checkGoal(goal: WeeklyGoalData) {
    this.snackBar.open(
      `Clicked on goal: ${goal.text}`,
      '',
      {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      },
    );
  }
  
  openModal(editClicked: boolean) {
    this.dialogRef = this.dialog.open(WeeklyGoalsModalComponent, {
      height: '90%',
      position: { bottom: '0' },
      panelClass: 'goal-modal-panel',
      data: {
        goalDatas: this.quarterlyGoals(),
        incompleteGoals: this.incompleteWeeklyGoals(),
        loading: this.loading,
        updateWeeklyGoals: async (weeklyGoalsFormArray) => {
          try {
            this.batch.batchWrite(
              async (batchConfig) => {
                await Promise.all(
                  weeklyGoalsFormArray.controls.map(async (control, i) => {
                    // if this is a new quarter goal
                    if (!control.value.__weeklyGoalId) {
                      await this.addNewGoal(control.value, i, batchConfig);
                      // if it's a goal that's getting deleted
                    } else if (control.value._deleted) {
                      await this.removeGoal(control.value, batchConfig);
                      // if it's a goal that's getting updated
                    } else {
                      await this.updateGoal(control.value, i, batchConfig);
                    }
                  })
                );
              },
              {
                optimistic: true,
                loading: this.loading,
                snackBarConfig: {
                  successMessage: 'Goals successfully updated',
                  failureMessage: 'Goal not added successfully',
                  undoOnAction: true,
                  config: { duration: 5000 },
                },
              }
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
  async addNewGoal(controlValue, i, batchConfig) {
    // Add a quarterly goal
    await this.weeklyGoalStore.add(
      Object.assign(
        {},
        {
          __userId: this.currentUser().__id,
          __quarterlyGoalId: controlValue.__quarterlyGoalId,
          text: controlValue.text,
          completed: false,
          order: i + 1,
          _deleted: controlValue._deleted,
        }
      ),
      { batchConfig }
    );
  }

  /** Removes some goal based off form values */
  async removeGoal(controlValue, batchConfig) {
    // no restrictions on deleting weekly goals, unlike quarterly goals
    await this.weeklyGoalStore.remove(controlValue.__weeklyGoalId, {
      batchConfig,
    });
  }

  /** Updates some goal based off form values */
  async updateGoal(controlValue, i, batchConfig) {
    // text or quarterly goal has changed, general update
    if (
      controlValue.originalText !== controlValue.text ||
      controlValue.originalOrder !== i + 1 ||
      (!controlValue.originalQuarterlyGoalId && controlValue.__quarterlyGoalId)
    ) {
      await this.weeklyGoalStore.update(
        controlValue.__weeklyGoalId,
        Object.assign(
          {},
          {
            __quarterlyGoalId: controlValue.__quarterlyGoalId,
            text: controlValue.text,
            order: i + 1,
            _deleted: controlValue._deleted,
          }
        ),
        { batchConfig }
      );
    }
  }

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(BATCH_WRITE_SERVICE) private batch: BatchWriteService,
  ) {}

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