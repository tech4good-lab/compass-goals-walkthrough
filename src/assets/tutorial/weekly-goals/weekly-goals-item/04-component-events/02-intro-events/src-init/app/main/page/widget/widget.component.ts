import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WidgetAnimations } from './widget.animations';
import { QuarterData } from '../+state/page.model';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WidgetAnimations,
})
export class WidgetComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  /** Emit the append event. */
  @Output() append: EventEmitter<string> = new EventEmitter<string>();

  // --------------- LOCAL AND GLOBAL STATE --------------

  /** Hello string variable. */
  thisStringVariable = '';

  /** Function to append another hello to the string. */
  appendString() {
    this.thisStringVariable += ' hello!';
    this.append.emit(this.thisStringVariable);
  }

  // --------------- DATA BINDING ------------------------

  // --------------- EVENT BINDING -----------------------

  // --------------- HELPER FUNCTIONS AND OTHER ----------

  constructor() { }

  ngOnInit(): void {
  }
}
