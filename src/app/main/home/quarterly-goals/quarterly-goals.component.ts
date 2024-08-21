import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector } from '@angular/core';
import { QuarterlyGoalsAnimations } from './quarterly-goals.animations';
import { User } from 'src/app/core/store/user/user.model';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { BatchWriteService, BATCH_WRITE_SERVICE } from 'src/app/core/store/batch-write.service';
import { QuarterlyGoalsHeaderComponent } from './quarterly-goals-header/quarterly-goals-header.component';
import { QuarterlyGoalsItemComponent } from './quarterly-goals-item/quarterly-goals-item.component';
import { QuarterlyGoalsModalComponent } from './quarterly-goals-modal/quarterly-goals-modal.component';
import { QuarterlyGoalData } from '../home.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { USER_DB } from 'src/app/core/store/user/user.mock';
import { Timestamp } from '@angular/fire/firestore';
import { HashtagStore, LoadHashtag } from 'src/app/core/store/hashtag/hashtag.store';
import { QuarterlyGoalStore } from 'src/app/core/store/quarterly-goal/quarterly-goal.store';
import { CommonModule } from '@angular/common';
import { getStartAndEndDate } from 'src/app/core/utils/time.utils';
import { LoadWeeklyGoal, WeeklyGoalStore } from 'src/app/core/store/weekly-goal/weekly-goal.store';
@Component({
  selector: 'app-quarterly-goals',
  templateUrl: './quarterly-goals.component.html',
  styleUrls: ['./quarterly-goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: QuarterlyGoalsAnimations,
  standalone: true,
  imports: [
    CommonModule,
    // Components
    QuarterlyGoalsHeaderComponent,
    QuarterlyGoalsItemComponent,
    QuarterlyGoalsModalComponent,
],
})
export class QuarterlyGoalsComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  readonly hashtagStore = inject(HashtagStore);
  readonly quarterlyGoalStore = inject(QuarterlyGoalStore);
  readonly weeklyGoalStore = inject(WeeklyGoalStore);
  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;

  // --------------- LOCAL UI STATE ----------------------

  completedQuarterlyGoals: Signal<QuarterlyGoalData[]> = computed(() => {
    const quarterDates = getStartAndEndDate();
    const quarterStartDate = quarterDates[0];
    const completedGoals = this.quarterlyGoalStore.selectEntities([
      ['__userId', '==', this.currentUser().__id], 
      ['completed', '==', true],
      ['endDate', '>=', Timestamp.fromDate(quarterStartDate)]
    ], {orderBy: "order"})
    return completedGoals.map((goal) => {
      return Object.assign({}, goal, {
        hashtag: this.hashtagStore.selectEntity(goal.__hashtagId),
        weeklyGoalsTotal: this.weeklyGoalStore.selectEntities([['__quarterlyGoalId', '==', goal.__id]], {}).length,
        weeklyGoalsComplete: this.weeklyGoalStore.selectEntities([['__quarterlyGoalId', '==', goal.__id], ['completed', '==', true]], {}).length
      })
    })
  });

  /** Incomplete quarterly goals. */
  incompleteQuarterlyGoals: Signal<QuarterlyGoalData[]> = computed(() => {
    const incompleteGoals = this.quarterlyGoalStore.selectEntities([
      ['__userId', '==', this.currentUser().__id],
      ['completed', '==', false],
    ], { orderBy: 'order' });

    return incompleteGoals.map((goal) => {
      return Object.assign({}, goal, {
        hashtag: this.hashtagStore.selectEntity(goal.__hashtagId),
        weeklyGoalsTotal: this.weeklyGoalStore.selectEntities([
          ['__quarterlyGoalId', '==', goal.__id],
        ], {}).length,
        weeklyGoalsComplete: this.weeklyGoalStore.selectEntities([
          ['__quarterlyGoalId', '==', goal.__id],
          ['completed', '==', true],
        ], {}).length,
      });
    });
  });

  /** Loading icon. */
  loading: WritableSignal<boolean> = signal(false);

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  async checkGoal(quarterlyGoalData: QuarterlyGoalData) {
    try {
      // add and remove are also possible
      await this.quarterlyGoalStore.update(quarterlyGoalData.__id, {
        completed: !quarterlyGoalData.completed,
        // only update if it's incompleted
        ...(!quarterlyGoalData.completed ? { endDate: Timestamp.now() }: {}),
      }, {
        snackBarConfig: {
          successMessage: 'Goal successfully updated',
          failureMessage: 'Goal not successfully updated',
          undoOnAction: true,
          config: { duration: 5000 },
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  // --------------- OTHER -------------------------------

  constructor(
    private injector: Injector,
  ) { }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {
    console.log(this.currentUser().__id)
    // uncompleted quarterly goals
    this.quarterlyGoalStore.load([['__userId', '==', this.currentUser().__id], ['completed', '==', false]], {orderBy: "order"}, (quarterlyGoal) => [
      LoadHashtag.create(this.hashtagStore, [['__id', '==', quarterlyGoal.__hashtagId]], {}),
      LoadWeeklyGoal.create(this.weeklyGoalStore, [['__quarterlyGoalId', '==', quarterlyGoal.__id]], {})
    ])

    // completed quarterly goals
    this.quarterlyGoalStore.load([['__userId', '==', this.currentUser().__id], ['endDate', '>=', Timestamp.fromDate(getStartAndEndDate()[0])]], {orderBy: "order"}, (quarterlyGoal) => [
      LoadHashtag.create(this.hashtagStore, [['__id', '==', quarterlyGoal.__hashtagId]], {}),
      LoadWeeklyGoal.create(this.weeklyGoalStore, [['__quarterlyGoalId', '==', quarterlyGoal.__id]], {})
    ])
  }
}
