import { ChangeDetectionStrategy, Component, OnInit, input, output } from '@angular/core';
import { WeeklyGoalsItemAnimations } from './weekly-goals-item.animations';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { WeeklyGoalData } from '../../home.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-weekly-goals-item',
  templateUrl: './weekly-goals-item.component.html',
  styleUrls: ['./weekly-goals-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WeeklyGoalsItemAnimations,
  standalone: true,
  imports: [
    MatCheckbox,
    MatProgressSpinner,
    NgStyle,
  ],
})
export class WeeklyGoalsItemComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  goal = input<WeeklyGoalData>();

  checked = output<WeeklyGoalData>();

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  checkGoal() {
    this.checked.emit(this.goal());
  }

  // --------------- OTHER -------------------------------

  constructor(
  ) { }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {
  }
}