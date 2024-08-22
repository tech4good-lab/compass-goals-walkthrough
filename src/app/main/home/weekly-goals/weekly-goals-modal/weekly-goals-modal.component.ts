import { Component, OnInit, ChangeDetectionStrategy, Injector, Inject, WritableSignal } from '@angular/core';
import { WeeklyGoalsModalAnimations } from './weekly-goals-modal.animations';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { startOfWeek, endOfWeek } from 'src/app/core/utils/time.utils';
import { QuarterlyGoalData, WeeklyGoalData, WeeklyGoalInForm } from '../../home.model';
import { Validators, FormArray, FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeeklyGoal } from 'src/app/core/store/weekly-goal/weekly-goal.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-weekly-goals-modal',
  templateUrl: './weekly-goals-modal.component.html',
  styleUrls: ['./weekly-goals-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WeeklyGoalsModalAnimations,
  standalone: true,
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    FormsModule,
    ReactiveFormsModule,
    NgFor
  ],
})
export class WeeklyGoalsModalComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  /** FormControls for editing past goals and adding a new one */
  weeklyGoalsForm = this.fb.group({
    allGoals: this.fb.array([
      this.fb.group({
        text: ['', Validators.required],
        originalText: [''],
        originalOrder: [1],
        __weeklyGoalId: [''],
        __quarterlyGoalId: [''], // changed from hashtagId
      }),
    ]),
  });

  /** Getter for the form array with a type that allows use of controls. */
  get allGoals() {
    return this.weeklyGoalsForm.get('allGoals') as FormArray;
  }

  /** Editable weekly goals form. */
  mutableWeekGoalsForm: WeeklyGoal[];

  /** Declare FormGroup for new goal */
  goalForm: FormGroup = new FormGroup({
    text: new FormControl(), // Assuming you have a control for the goal text
    __quarterlyGoalId: new FormControl(), // Assuming you have a control for the hashtag ID
  });

  // --------------- COMPUTED DATA ----------------------

  startOfWeek = startOfWeek;
  endOfWeek = endOfWeek;

  // --------------- EVENT HANDLING ----------------------

  /** Add a goal to the form. */
  addGoalToForm(goal: WeeklyGoalInForm) {
    if (goal) {
      this.allGoals.push(this.fb.group({
        text: [goal.text, Validators.required],
        originalText: [goal.text],
        originalOrder: [goal.originalOrder],
        originalQuarterlyGoalId: [goal.__quarterlyGoalId],
        __weeklyGoalId: [goal.__weeklyGoalId],
        __quarterlyGoalId: [goal.__quarterlyGoalId, Validators.required],
        _deleted: [false],
        _new: [false],
      }));
    } else {
      this.allGoals.push(this.fb.group({
        text: ['', Validators.required],
        __quarterlyGoalId: ['', Validators.required],
        _deleted: [false],
        _new: [true],
      }));
    }
  }

  // --------------- OTHER -------------------------------

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      goalDatas: Partial<QuarterlyGoalData>,
      incompleteGoals: WeeklyGoalData,
    },
  ) {
    // Initialize the quarterGoalsForm with the set of incompleteGoals
    this.allGoals.clear();
    this.addGoalToForm({
      text: this.data.incompleteGoals.text,
      __quarterlyGoalId: this.data.incompleteGoals.__quarterlyGoalId,
      originalText: this.data.incompleteGoals.text,
      originalOrder: this.data.incompleteGoals.order,
      originalQuarterlyGoalId: this.data.incompleteGoals. __quarterlyGoalId,
      __weeklyGoalId: this.data.incompleteGoals.__id,
      _deleted: this.data.incompleteGoals._deleted,
      _new: false,
    });
    console.log(this.allGoals)
  }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {
    console.log(this.data.goalDatas, this.data.incompleteGoals)
  }
}
