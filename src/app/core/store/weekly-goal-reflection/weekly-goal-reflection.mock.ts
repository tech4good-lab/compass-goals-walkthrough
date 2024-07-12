import { Timestamp } from '@angular/fire/firestore';
import { WeeklyGoalReflection } from './weekly-goal-reflection.model';
import { withEntitiesForMockDB } from '../app.store';
import { signalStore } from '@ngrx/signals';

export const WeeklyGoalReflectionMockDB = signalStore(
  { providedIn: 'root' },
  withEntitiesForMockDB<WeeklyGoalReflection>(),
);

export const WEEKLYGOALREFLECTION_DB = [
];
