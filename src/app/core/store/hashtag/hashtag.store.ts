import { inject, effect, WritableSignal } from '@angular/core';
import { signalStore, patchState, withState, withMethods } from '@ngrx/signals';
import { withEntities, removeEntity, updateEntity, setEntity, removeEntities, setEntities } from '@ngrx/signals/entities';
import { EntityLoadQuery, EntityStreamQuery, selectEntities, processLoadQueries, withEntitiesAndDBMethods } from 'src/app/core/store/app.store';
import { QueryParams, QueryOptions, AnyEntity } from 'src/app/core/store/app.model';
import { Hashtag } from './hashtag.model';

export class LoadHashtag extends EntityLoadQuery<Hashtag> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    loadQueries?: (entity: Hashtag) => EntityLoadQuery<AnyEntity>[],
  ) {
    super('hashtags', store, queryParams, queryOptions, loadQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, loadQueries?: (entity: Hashtag) => EntityLoadQuery<AnyEntity>[]): LoadHashtag {
    return new LoadHashtag(store, queryParams, queryOptions, loadQueries);
  }
}

export class StreamHashtag extends EntityStreamQuery<Hashtag> {
  constructor(
    store,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    streamQueries?: (entity: Hashtag) => EntityStreamQuery<AnyEntity>[],
  ) {
    super('hashtags', store, queryParams, queryOptions, streamQueries);
  }

  static create(store, queryParams: QueryParams, queryOptions: QueryOptions, streamQueries?: (entity: Hashtag) => EntityStreamQuery<AnyEntity>[]): StreamHashtag {
    return new StreamHashtag(store, queryParams, queryOptions, streamQueries);
  }
}

export const HashtagStore = signalStore(
  { providedIn: 'root' },
  withEntitiesAndDBMethods<Hashtag>('hashtags'),
);
