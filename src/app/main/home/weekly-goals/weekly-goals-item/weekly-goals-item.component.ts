import { ChangeDetectionStrategy, Component, OnInit, input } from '@angular/core';
import { WeeklyGoalsItemAnimations } from './weekly-goals-item.animations';
import { MatCheckbox } from '@angular/material/checkbox';
import { WeeklyGoalData } from '../../home.model';

@Component({
  selector: 'app-weekly-goals-item',
  templateUrl: './weekly-goals-item.component.html',
  styleUrls: ['./weekly-goals-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WeeklyGoalsItemAnimations,
  standalone: true,
  imports: [
    MatCheckbox,
  ],
})
export class WeeklyGoalsItemComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  goal = input<WeeklyGoalData>();

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor(
  ) { }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {
  }
}