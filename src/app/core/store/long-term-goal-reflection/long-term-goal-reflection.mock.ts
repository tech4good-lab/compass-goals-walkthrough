import { Timestamp } from '@angular/fire/firestore';
import { LongTermGoalReflection } from './long-term-goal-reflection.model';
import { withEntitiesForMockDB } from '../app.store';
import { signalStore } from '@ngrx/signals';

export const LongTermGoalReflectionMockDB = signalStore(
  { providedIn: 'root' },
  withEntitiesForMockDB<LongTermGoalReflection>(),
);

export const LONGTERMGOALREFLECTION_DB = [
];
