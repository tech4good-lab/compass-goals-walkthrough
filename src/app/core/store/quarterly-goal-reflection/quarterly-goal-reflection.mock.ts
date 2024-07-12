import { Timestamp } from '@angular/fire/firestore';
import { QuarterlyGoalReflection } from './quarterly-goal-reflection.model';
import { withEntitiesForMockDB } from '../app.store';
import { signalStore } from '@ngrx/signals';

export const QuarterlyGoalReflectionMockDB = signalStore(
  { providedIn: 'root' },
  withEntitiesForMockDB<QuarterlyGoalReflection>(),
);

export const QUARTERLYGOALREFLECTION_DB = [
];
