import { ChangeDetectionStrategy, Component, OnInit, Signal, computed } from '@angular/core';
import { WeeklyGoalsAnimations } from './weekly-goals.animations';
import { WeeklyGoalsHeaderComponent } from './weekly-goals-header/weekly-goals-header.component';
import { WeeklyGoalsItemComponent } from './weekly-goals-item/weekly-goals-item.component';
import { WeeklyGoalsModalComponent } from './weekly-goals-modal/weekly-goals-modal.component';
import { Timestamp } from '@angular/fire/firestore';
import { WeeklyGoalData } from '../home.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AccessState, User } from 'src/app/core/store/user/user.model';

@Component({
  selector: 'app-weekly-goals',
  templateUrl: './weekly-goals.component.html',
  styleUrls: ['./weekly-goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WeeklyGoalsAnimations,
  standalone: true,
  imports: [
    // Components
    WeeklyGoalsItemComponent,
    WeeklyGoalsHeaderComponent,
    WeeklyGoalsModalComponent
  ],
})
export class WeeklyGoalsComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  currentUser: Signal<User> = computed(() => {
    return {
      __id: 'test-user',
      email: 'a@sample.com',
      name: 'User A',
      photoURL: 'http://loremflickr.com/100/100',
      isAdmin: false,
      consented: true,
      accessState: AccessState.DONE,
      _createdAt: Timestamp.now(),
      _updatedAt: Timestamp.now(),
      _deleted: false,
    }
  });

  weeklyGoals: Signal<WeeklyGoalData[]> = computed(() => {
    return [
      {
        __id: 'wg1',
        __userId: 'test-user',
        __quarterlyGoalId: 'qg1',
        __hashtagId: 'ht1',
        text: 'Finish Google Cover Letter',
        completed: false,
        order: 1,
        _createdAt: Timestamp.now(),
        _updatedAt: Timestamp.now(),
        _deleted: false,
        hashtag: {
          __id: 'ht1',
          name: 'apply-internships',
          color: '#EE8B72',
          _createdAt: Timestamp.now(),
          _updatedAt: Timestamp.now(),
          _deleted: false,
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
        _createdAt: Timestamp.now(),
        _updatedAt: Timestamp.now(),
        _deleted: false,
        hashtag: {
          __id: 'ht2',
          name: 'apply',
          color: '#2DBDB1',
          _createdAt: Timestamp.now(),
          _updatedAt: Timestamp.now(),
          _deleted: false,
        },
      },
      {
        __id: 'wg3',
        __userId: 'test-user',
        __quarterlyGoalId: 'qg3',
        __hashtagId: 'ht3',
        text: 'Review data structures',
        completed: false,
        order: 3,
        _createdAt: Timestamp.now(),
        _updatedAt: Timestamp.now(),
        _deleted: false,
        hashtag: {
          __id: 'ht3',
          name: 'interview',
          color: '#FFB987',
          _createdAt: Timestamp.now(),
          _updatedAt: Timestamp.now(),
          _deleted: false,
        }
      },
    ]
  });

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  /** Check weekly goal. */
  async checkGoal(goal: WeeklyGoalData) {
    this.snackBar.open(
      `Clicked on goal "${goal.text}"`,
      '',
      {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      },
    );
  }

  /** Update weekly goals. */
  async updateGoals(editClicked: boolean) {
    this.snackBar.open(
      'Clicked on edit icon',
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
  ) { }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {
  }
}
