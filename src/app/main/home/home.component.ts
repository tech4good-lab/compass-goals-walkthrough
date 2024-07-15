import { inject, effect, Component, OnInit, ChangeDetectionStrategy, Signal } from '@angular/core';
import { HomeAnimations } from './home.animations';
import { DateTimeComponent } from './date-time/date-time.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: HomeAnimations,
  imports: [DateTimeComponent]
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
