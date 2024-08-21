import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector } from '@angular/core';
import { QuarterlyGoalsHeaderAnimations } from './quarterly-goals-header.animations';
import { User } from 'src/app/core/store/user/user.model';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { BatchWriteService, BATCH_WRITE_SERVICE } from 'src/app/core/store/batch-write.service';
import { getQuarterAndYear } from 'src/app/core/utils/time.utils';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-quarterly-goals-header',
  templateUrl: './quarterly-goals-header.component.html',
  styleUrls: ['./quarterly-goals-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: QuarterlyGoalsHeaderAnimations,
  standalone: true,
  imports: [
    NgOptimizedImage,
  ],
})
export class QuarterlyGoalsHeaderComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // no input for this component – it's not needed :)
  editClicked = output<boolean>();

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA -----------------------

  getQuarterAndYear = getQuarterAndYear;

  // --------------- EVENT HANDLING ----------------------

  /** Update weekly goal. */
  editGoals() {
    this.editClicked.emit(true);
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
