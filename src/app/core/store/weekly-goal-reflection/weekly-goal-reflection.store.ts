import { inject, effect, WritableSignal } from '@angular/core';
import { signalStore, patchState, withState, withMethods } from '@ngrx/signals';
import { withEntities, removeEntity, updateEntity, setEntity, removeEntities, setEntities } from '@ngrx/signals/entities';
import { EntityLoadQuery, EntityStreamQuery, selectEntities, processLoadQueries, withEntitiesAndDBMethods } from 'src/app/core/store/app.store';
import { QueryParams, QueryOptions, AnyEntity } from 'src/app/core/store/app.model';
import { WeeklyGoalReflection } from './weekly-goal-reflection.model';

export class LoadWeeklyGoalReflection extends EntityLoadQuery<WeeklyGoalReflection> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    loadQueries?: (entity: WeeklyGoalReflection) => EntityLoadQuery<AnyEntity>[],
  ) {
    super('weeklyGoalReflections', store, queryParams, queryOptions, loadQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, loadQueries?: (entity: WeeklyGoalReflection) => EntityLoadQuery<AnyEntity>[]): LoadWeeklyGoalReflection {
    return new LoadWeeklyGoalReflection(store, queryParams, queryOptions, loadQueries);
  }
}

export class StreamWeeklyGoalReflection extends EntityStreamQuery<WeeklyGoalReflection> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    streamQueries?: (entity: WeeklyGoalReflection) => EntityStreamQuery<AnyEntity>[],
  ) {
    super('weeklyGoalReflections', store, queryParams, queryOptions, streamQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, streamQueries?: (entity: WeeklyGoalReflection) => EntityStreamQuery<AnyEntity>[]): StreamWeeklyGoalReflection {
    return new StreamWeeklyGoalReflection(store, queryParams, queryOptions, streamQueries);
  }
}

export const WeeklyGoalReflectionStore = signalStore(
  { providedIn: 'root' },
  withEntitiesAndDBMethods<WeeklyGoalReflection>('weeklyGoalReflections'),
);
