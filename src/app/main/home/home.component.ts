import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeAnimations } from './home.animations';
import { WeeklyGoalsComponent } from './weekly-goals/weekly-goals.component';
import { QuarterlyGoalsComponent } from './quarterly-goals/quarterly-goals.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: HomeAnimations,
  imports: [
    /** Containers */
    QuarterlyGoalsComponent,
  ]
})
export class HomeComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor() {
  }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit() {
  }
}
