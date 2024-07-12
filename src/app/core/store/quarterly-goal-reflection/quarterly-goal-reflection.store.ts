import { inject, effect, WritableSignal } from '@angular/core';
import { signalStore, patchState, withState, withMethods } from '@ngrx/signals';
import { withEntities, removeEntity, updateEntity, setEntity, removeEntities, setEntities } from '@ngrx/signals/entities';
import { EntityLoadQuery, EntityStreamQuery, selectEntities, processLoadQueries, withEntitiesAndDBMethods } from 'src/app/core/store/app.store';
import { QueryParams, QueryOptions, AnyEntity } from 'src/app/core/store/app.model';
import { QuarterlyGoalReflection } from './quarterly-goal-reflection.model';

export class LoadQuarterlyGoalReflection extends EntityLoadQuery<QuarterlyGoalReflection> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    loadQueries?: (entity: QuarterlyGoalReflection) => EntityLoadQuery<AnyEntity>[],
  ) {
    super('quarterlyGoalReflections', store, queryParams, queryOptions, loadQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, loadQueries?: (entity: QuarterlyGoalReflection) => EntityLoadQuery<AnyEntity>[]): LoadQuarterlyGoalReflection {
    return new LoadQuarterlyGoalReflection(store, queryParams, queryOptions, loadQueries);
  }
}

export class StreamQuarterlyGoalReflection extends EntityStreamQuery<QuarterlyGoalReflection> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    streamQueries?: (entity: QuarterlyGoalReflection) => EntityStreamQuery<AnyEntity>[],
  ) {
    super('quarterlyGoalReflections', store, queryParams, queryOptions, streamQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, streamQueries?: (entity: QuarterlyGoalReflection) => EntityStreamQuery<AnyEntity>[]): StreamQuarterlyGoalReflection {
    return new StreamQuarterlyGoalReflection(store, queryParams, queryOptions, streamQueries);
  }
}

export const QuarterlyGoalReflectionStore = signalStore(
  { providedIn: 'root' },
  withEntitiesAndDBMethods<QuarterlyGoalReflection>('quarterlyGoalReflections'),
);
