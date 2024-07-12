import { inject, effect, WritableSignal } from '@angular/core';
import { signalStore, patchState, withState, withMethods } from '@ngrx/signals';
import { withEntities, removeEntity, updateEntity, setEntity, removeEntities, setEntities } from '@ngrx/signals/entities';
import { EntityLoadQuery, EntityStreamQuery, selectEntities, processLoadQueries, withEntitiesAndDBMethods } from 'src/app/core/store/app.store';
import { QueryParams, QueryOptions, AnyEntity } from 'src/app/core/store/app.model';
import { LongTermGoalReflection } from './long-term-goal-reflection.model';

export class LoadLongTermGoalReflection extends EntityLoadQuery<LongTermGoalReflection> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    loadQueries?: (entity: LongTermGoalReflection) => EntityLoadQuery<AnyEntity>[],
  ) {
    super('longTermGoalReflections', store, queryParams, queryOptions, loadQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, loadQueries?: (entity: LongTermGoalReflection) => EntityLoadQuery<AnyEntity>[]): LoadLongTermGoalReflection {
    return new LoadLongTermGoalReflection(store, queryParams, queryOptions, loadQueries);
  }
}

export class StreamLongTermGoalReflection extends EntityStreamQuery<LongTermGoalReflection> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    streamQueries?: (entity: LongTermGoalReflection) => EntityStreamQuery<AnyEntity>[],
  ) {
    super('longTermGoalReflections', store, queryParams, queryOptions, streamQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, streamQueries?: (entity: LongTermGoalReflection) => EntityStreamQuery<AnyEntity>[]): StreamLongTermGoalReflection {
    return new StreamLongTermGoalReflection(store, queryParams, queryOptions, streamQueries);
  }
}

export const LongTermGoalReflectionStore = signalStore(
  { providedIn: 'root' },
  withEntitiesAndDBMethods<LongTermGoalReflection>('longTermGoalReflections'),
);
