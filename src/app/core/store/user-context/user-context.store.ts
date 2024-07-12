import { inject, effect, WritableSignal } from '@angular/core';
import { signalStore, patchState, withState, withMethods } from '@ngrx/signals';
import { withEntities, removeEntity, updateEntity, setEntity, removeEntities, setEntities } from '@ngrx/signals/entities';
import { EntityLoadQuery, EntityStreamQuery, selectEntities, processLoadQueries, withEntitiesAndDBMethods } from '../app.store';
import { QueryParams, QueryOptions, AnyEntity } from '../app.model';
import { UserContext } from './user-context.model';

export class LoadUserContext extends EntityLoadQuery<UserContext> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    loadQueries?: (entity: UserContext) => EntityLoadQuery<AnyEntity>[],
  ) {
    super('userContexts', store, queryParams, queryOptions, loadQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, loadQueries?: (entity: UserContext) => EntityLoadQuery<AnyEntity>[]): LoadUserContext {
    return new LoadUserContext(store, queryParams, queryOptions, loadQueries);
  }
}

export class StreamUserContext extends EntityStreamQuery<UserContext> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    streamQueries?: (entity: UserContext) => EntityStreamQuery<AnyEntity>[],
  ) {
    super('userContexts', store, queryParams, queryOptions, streamQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, streamQueries?: (entity: UserContext) => EntityStreamQuery<AnyEntity>[]): StreamUserContext {
    return new StreamUserContext(store, queryParams, queryOptions, streamQueries);
  }
}

export const UserContextStore = signalStore(
  { providedIn: 'root' },
  withEntitiesAndDBMethods<UserContext>('userContexts'),
);
