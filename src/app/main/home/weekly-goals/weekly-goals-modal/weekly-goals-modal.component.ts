import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { WeeklyGoalsModalAnimations } from './weekly-goals-modal.animations';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatDialogClose } from '@angular/material/dialog';
import { startOfWeek, endOfWeek } from 'src/app/core/utils/time.utils';

@Component({
  selector: 'app-weekly-goals-modal',
  templateUrl: './weekly-goals-modal.component.html',
  styleUrls: ['./weekly-goals-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WeeklyGoalsModalAnimations,
  standalone: true,
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
  ],
})
export class WeeklyGoalsModalComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL UI STATE ----------------------

  // --------------- COMPUTED DATA ----------------------

  startOfWeek = startOfWeek;
  endOfWeek = endOfWeek;

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor(
    private injector: Injector,
  ) {
  }

  // --------------- LOAD AND CLEANUP --------------------

  ngOnInit(): void {
  }
}
