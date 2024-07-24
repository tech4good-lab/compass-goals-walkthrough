import { ChangeDetectionStrategy, Component, OnInit, input } from '@angular/core';
import { WeeklyGoalsItemAnimations } from './weekly-goals-item.animations';
import { MatCheckbox } from '@angular/material/checkbox';
import { Timestamp } from '@angular/fire/firestore';
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

  sampleData: WeeklyGoalData = {
    __id: 'wg1',
    __userId: 'test-user',
    __quarterlyGoalId: 'qg1',
    __hashtagId: 'ht1',
    text: 'Finish Google Cover Letter',
    completed: false,
    order: 1,
    _createdAt: Timestamp.now(),
    _updatedAt: Timestamp.now(),
    _deleted: false,
    hashtag: {
      __id: 'ht1',
      name: 'apply-internships',
      color: '#EE8B72',
      _createdAt: Timestamp.now(),
      _updatedAt: Timestamp.now(),
      _deleted: false,
    },
  };

  goal = input<WeeklyGoalData>(this.sampleData);

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