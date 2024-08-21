import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector } from '@angular/core';
import { QuarterlyGoalsItemAnimations } from './quarterly-goals-item.animations';
import { User } from 'src/app/core/store/user/user.model';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { BatchWriteService, BATCH_WRITE_SERVICE } from 'src/app/core/store/batch-write.service';
import { QuarterlyGoalData } from '../../home.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-quarterly-goals-item',
  templateUrl: './quarterly-goals-item.component.html',
  styleUrls: ['./quarterly-goals-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: QuarterlyGoalsItemAnimations,
  standalone: true,
  imports: [
    MatCheckbox,
    NgStyle,
  ],
})
export class QuarterlyGoalsItemComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  goal = input.required<QuarterlyGoalData>();
  checked = output<QuarterlyGoalData>();

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------
   /** Update weekly goal. */
   checkGoal(goal: QuarterlyGoalData) {
    this.checked.emit(goal);
  }

  // --------------- OTHER -------------------------------

  constructor(
    private injector: Injector,
    @Inject(BATCH_WRITE_SERVICE) private batch: BatchWriteService,
  ) { }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {
  }
}
