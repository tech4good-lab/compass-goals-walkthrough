import { inject, effect, WritableSignal } from '@angular/core';
import { signalStore, patchState, withState, withMethods } from '@ngrx/signals';
import { withEntities, removeEntity, updateEntity, setEntity, removeEntities, setEntities } from '@ngrx/signals/entities';
import { EntityLoadQuery, EntityStreamQuery, selectEntities, processLoadQueries, withEntitiesAndDBMethods } from 'src/app/core/store/app.store';
import { QueryParams, QueryOptions, AnyEntity } from 'src/app/core/store/app.model';
import { LongTermGoal } from './long-term-goal.model';

export class LoadLongTermGoal extends EntityLoadQuery<LongTermGoal> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    loadQueries?: (entity: LongTermGoal) => EntityLoadQuery<AnyEntity>[],
  ) {
    super('longTermGoals', store, queryParams, queryOptions, loadQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, loadQueries?: (entity: LongTermGoal) => EntityLoadQuery<AnyEntity>[]): LoadLongTermGoal {
    return new LoadLongTermGoal(store, queryParams, queryOptions, loadQueries);
  }
}

export class StreamLongTermGoal extends EntityStreamQuery<LongTermGoal> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    streamQueries?: (entity: LongTermGoal) => EntityStreamQuery<AnyEntity>[],
  ) {
    super('longTermGoals', store, queryParams, queryOptions, streamQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, streamQueries?: (entity: LongTermGoal) => EntityStreamQuery<AnyEntity>[]): StreamLongTermGoal {
    return new StreamLongTermGoal(store, queryParams, queryOptions, streamQueries);
  }
}

export const LongTermGoalStore = signalStore(
  { providedIn: 'root' },
  withEntitiesAndDBMethods<LongTermGoal>('longTermGoals'),
);
