import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { WeeklyGoalsAnimations } from './weekly-goals.animations';
import { WeeklyGoalsItemComponent } from './weekly-goals-item/weekly-goals-item.component';
import { QuarterlyGoalData, WeeklyGoalData } from '../home.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeeklyGoalsHeaderComponent } from "./weekly-goals-header/weekly-goals-header.component";
import { Timestamp } from '@angular/fire/firestore';
import { HashtagStore, LoadHashtag } from 'src/app/core/store/hashtag/hashtag.store';
import { LoadQuarterlyGoal, QuarterlyGoalStore } from 'src/app/core/store/quarterly-goal/quarterly-goal.store';
import { getStartWeekDate } from 'src/app/core/utils/time.utils';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { WeeklyGoalStore } from 'src/app/core/store/weekly-goal/weekly-goal.store';

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

  // --------------- LOCAL UI STATE ----------------------

  incompleteWeeklyGoals: WeeklyGoalData[] = [
    {
      __id: 'wg1',
      __userId: 'test-user',
      __quarterlyGoalId: 'qg1',
      __hashtagId: 'ht1',
      text: 'Finish Google Cover Letter',
      completed: false,
      order: 1,
      hashtag: {
        __id: 'ht1',
        name: 'coverletter',
        color: '#EE8B72',
      },
    },
    {
      __id: 'wg2',
      __userId: 'test-user',
      __quarterlyGoalId: 'qg2',
      __hashtagId: 'ht2',
      text: 'Apply to Microsoft',
      completed: false,
      order: 2,
      hashtag: {
        __id: 'ht2',
        name: 'apply',
        color: '#2DBDB1',
      },
    },
  ];

  completeWeeklyGoals: WeeklyGoalData[] = [
    {
      __id: 'wg3',
      __userId: 'test-user',
      __quarterlyGoalId: 'qg3',
      __hashtagId: 'ht3',
      text: 'Review data structures',
      completed: true,
      order: 3,
      hashtag: {
        __id: 'ht3',
        name: 'interview',
        color: '#FFB987',
        _deleted: false,
      },
    },
  ];

  quarterlyGoals: QuarterlyGoalData[] = [
    {
      __id: 'qg1',
      __userId: 'test-user',
      __hashtagId: 'ht1',
      text: 'Finish cover letters',
      completed: false,
      order: 1,
      hashtag: {
        __id: 'ht1',
        name: 'coverletter',
        color: '#EE8B72',
      },
      weeklyGoalsTotal: 1,
      weeklyGoalsComplete: 0,
    },
    {
      __id: 'qg2',
      __userId: 'test-user',
      __hashtagId: 'ht2',
      text: 'Apply to internships',
      completed: false,
      order: 2,
      hashtag: {
        __id: 'ht2',
        name: 'apply',
        color: '#2DBDB1',
      },
      weeklyGoalsTotal: 1,
      weeklyGoalsComplete: 0,
    },
    {
      __id: 'qg3',
      __userId: 'test-user',
      __hashtagId: 'ht3',
      text: 'Technical interview prep!',
      completed: false,
      order: 3,
      hashtag: {
        __id: 'ht3',
        name: 'interview',
        color: '#FFB987',
      },
      weeklyGoalsTotal: 1,
      weeklyGoalsComplete: 1,
    },
  ];

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
    this.snackBar.open(
      `Edit goals clicked`,
      '',
      {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      },
    );
  }

  // --------------- OTHER -------------------------------

  constructor(
    private snackBar: MatSnackBar,
  ) {}

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit() {
    // loading uncompleted goals
    this.weeklyGoalStore.load(
      [
        ['__userId', '==', this.currentUser().__id],
        ['completed', '==', false],
      ],
      { orderBy: 'order' },
      (wg) => [
        LoadQuarterlyGoal.create(
          this.quarterlyGoalStore,
          [['__id', '==', wg.__quarterlyGoalId]],
          {},
          (qg) => [
            LoadHashtag.create(
              this.hashtagStore,
              [['__id', '==', qg.__hashtagId]],
              {},
            ),
          ],
        ),
      ],
    );

    // loading completed goals
    this.weeklyGoalStore.load(
      [
        ['__userId', '==', this.currentUser().__id],
        ['endDate', '>=', Timestamp.fromDate(getStartWeekDate())],
      ],
      { orderBy: 'order' },
      (wg) => [
        LoadQuarterlyGoal.create(
          this.quarterlyGoalStore,
          [['__id', '==', wg.__quarterlyGoalId]],
          {},
          (qg) => [
            LoadHashtag.create(
              this.hashtagStore,
              [['__id', '==', qg.__hashtagId]],
              {},
            ),
          ],
        ),
      ],
    );
  }
}