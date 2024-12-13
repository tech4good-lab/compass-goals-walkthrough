import { Component,OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DateTimeAnimations } from './date-time.animations';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: DateTimeAnimations,
  standalone: true,
  imports: [],
})
export class DateTimeComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor() {}

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {}
}
