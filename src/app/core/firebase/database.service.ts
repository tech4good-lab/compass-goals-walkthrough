import { InjectionToken, Injector } from '@angular/core';
import { QueryParams, QueryOptions, AnyEntity } from '../store/app.model';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { WriteBatchI } from '../store/batch-write.service';

export interface DatabaseService {
  createId(): string;
  afUser(): Observable<{ uid: string, email: string, displayName: string, photoURL: string }>;
  login(providerId: string, scope?: string): any;
  loginLink(error): void;
  logout(): any;
  streamEntity<T>(collectionName: string, id: string): Observable<T>;
  streamEntities<T>(collectionName, queryParams, queryOptions?): Observable<T[]>;
  streamEntitiesChanges<T>(collectionName, queryParams, queryOptions?): Observable<{
    type: string;
    docData: T;
  }[]>;
  getEntity<T>(collectionName: string, id: string): Promise<T>;
  getEntities<S>(
    collectionName: string,
    queryParams: [string, string, any][],
    queryOptions?: { [index: string]: any },
  ): Promise<S[]>;
  count(
    collectionName: string,
    queryParams: QueryParams,
    queryOptions?: QueryOptions,
  ): Promise<number>;
  aggregate<S extends { [k: string]: number }>(
    collectionName: string,
    queryParams: QueryParams,
    queryOptions: QueryOptions,
    aggregateParams: { [K in keyof S]: [string] | [string, string] },
  ): Promise<{ [K in keyof S]: number }>;
  addEntity(
    collectionName: string,
    entity: AnyEntity,
    batch?: WriteBatchI,
  ): Promise<any>;
  updateEntity(
    collectionName: string,
    id: string,
    changes: Partial<AnyEntity>,
    batch?: WriteBatchI,
  ): Promise<any>;
  removeEntity(
    collectionName: string,
    id: string,
    batch?: WriteBatchI,
  ): Promise<any>;
  incrementEntityField(collectionName, id, field, delta): Promise<void>;
}

// InjectionToken that can be swapped out for
export const DATABASE_SERVICE = new InjectionToken<DatabaseService>('DatabaseService');
