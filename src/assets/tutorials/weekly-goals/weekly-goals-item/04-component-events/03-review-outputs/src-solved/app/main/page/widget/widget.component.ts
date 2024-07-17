import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WidgetAnimations } from './widget.animations';
import { QuarterData } from '../+state/page.model';
import { QuarterGoal } from '../../../core/store/quarter-goal/quarter-goal.model';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WidgetAnimations,
})
export class WidgetComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  /** The quarter and its associated goals. */
  @Input() quarterData: QuarterData;

  /** Initiate edit of quarterly goals. */
  @Output() editGoals: EventEmitter<void> = new EventEmitter<void>();

  // --------------- LOCAL AND GLOBAL STATE --------------

  // --------------- DATA BINDING ------------------------

  /** Quarter goal trackBy function. */
  trackByFn(index: number, goal: QuarterGoal): string {
    return goal.__id;
  }

  /** Get the current quarter. */
  getTerm() {
    const date = new Date(this.quarterData.startTime);
    const month = date.getMonth();
    if (month <= 2) {
      return 'Winter';
    } else if (month <= 5) {
      return 'Spring';
    } else if (month <= 8) {
      return 'Summer';
    } else {
      return 'Fall';
    }
  }

  // --------------- EVENT BINDING -----------------------

  // --------------- HELPER FUNCTIONS AND OTHER ----------

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.editGoals.emit();
    }, 2000);
  }
}
