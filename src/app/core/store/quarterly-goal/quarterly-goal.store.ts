import { inject, effect, WritableSignal } from '@angular/core';
import { signalStore, patchState, withState, withMethods } from '@ngrx/signals';
import { withEntities, removeEntity, updateEntity, setEntity, removeEntities, setEntities } from '@ngrx/signals/entities';
import { EntityLoadQuery, EntityStreamQuery, selectEntities, processLoadQueries, withEntitiesAndDBMethods } from 'src/app/core/store/app.store';
import { QueryParams, QueryOptions, AnyEntity } from 'src/app/core/store/app.model';
import { QuarterlyGoal } from './quarterly-goal.model';

export class LoadQuarterlyGoal extends EntityLoadQuery<QuarterlyGoal> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    loadQueries?: (entity: QuarterlyGoal) => EntityLoadQuery<AnyEntity>[],
  ) {
    super('quarterlyGoals', store, queryParams, queryOptions, loadQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, loadQueries?: (entity: QuarterlyGoal) => EntityLoadQuery<AnyEntity>[]): LoadQuarterlyGoal {
    return new LoadQuarterlyGoal(store, queryParams, queryOptions, loadQueries);
  }
}

export class StreamQuarterlyGoal extends EntityStreamQuery<QuarterlyGoal> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    streamQueries?: (entity: QuarterlyGoal) => EntityStreamQuery<AnyEntity>[],
  ) {
    super('quarterlyGoals', store, queryParams, queryOptions, streamQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, streamQueries?: (entity: QuarterlyGoal) => EntityStreamQuery<AnyEntity>[]): StreamQuarterlyGoal {
    return new StreamQuarterlyGoal(store, queryParams, queryOptions, streamQueries);
  }
}

export const QuarterlyGoalStore = signalStore(
  { providedIn: 'root' },
  withEntitiesAndDBMethods<QuarterlyGoal>('quarterlyGoals'),
);
