import { ChangeDetectionStrategy, Component, OnInit, input } from '@angular/core';
import { WeeklyGoalsItemAnimations } from './weekly-goals-item.animations';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { WeeklyGoalData } from '../../home.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ],
})
export class WeeklyGoalsItemComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  goal = input<WeeklyGoalData>();

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  checkGoal() {
    this.snackBar.open(
      `Clicked on goal "${this.goal().text}"`,
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