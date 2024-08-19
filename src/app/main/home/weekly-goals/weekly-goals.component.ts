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
    WeeklyGoalsModalComponent,
  ],
})

export class WeeklyGoalsComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  /** The current signed in user. */
  currentUser: User = {
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
  };

  weeklyGoals: WeeklyGoalData[] = [
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
      },
    },
  ];

  quarterlyGoals: QuarterlyGoalData[] = [{
    __id: 'qg1',
    __userId: 'test-user',
    __hashtagId: 'ht1',
    text: 'Finish cover letters',
    completed: false,
    order: 1,
    _createdAt: Timestamp.now(),
    _updatedAt: Timestamp.now(),
    _deleted: false,
    hashtag: {
      __id: 'ht1',
      name: 'coverletter',
      color: '#EE8B72',
      _createdAt: Timestamp.now(),
      _updatedAt: Timestamp.now(),
      _deleted: false,
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
    },
    weeklyGoalsTotal: 1,
    weeklyGoalsComplete: 0,
  }];

  /** For storing the dialogRef in the opened modal. */
  dialogRef: MatDialogRef<any>;

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  /** Update weekly goal. */
  async checkGoal(goal: WeeklyGoalData) {
    try {
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
        goalDatas: this.quarterlyGoals,
        incompleteGoals: this.weeklyGoals,
        updateWeeklyGoals: async (weeklyGoalsFormArray) => {
          try {
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


  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {
  }
}
