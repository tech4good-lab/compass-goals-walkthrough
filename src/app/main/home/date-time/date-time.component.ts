import { Component,OnInit, ChangeDetectionStrategy, computed, Signal } from '@angular/core';
import { DateTimeAnimations } from './date-time.animations';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, startWith, map } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: DateTimeAnimations,
  standalone: true,
  imports: [DatePipe],
})
export class DateTimeComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  /** Current time as signal */
  time: Signal<Date> = toSignal(
    interval(1000).pipe(
      startWith(0),
      map(() => new Date())
    ),
    { requireSync: true }
  );

  /** Date suffix based on the day of month */
  dateSuffix: Signal<string> = computed(() => {
    const currentDay = this.time().getDate();
    if (currentDay > 3 && currentDay < 21) return 'th';
    switch (currentDay % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  });

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor() {}

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {}
}
