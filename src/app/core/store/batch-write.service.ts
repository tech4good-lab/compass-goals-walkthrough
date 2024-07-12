import { openSnackBarWithUndoOption } from './app.store';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { InjectionToken, Injectable, WritableSignal, inject } from '@angular/core';
import { WriteBatchMock } from './batch-write.mock.service';
import { WriteBatch } from '@angular/fire/firestore';

export interface WriteBatchI {
  update(docRef, changes);
  set(docRef, entity);
  delete(docRef);
  commit();
}

export interface BatchWriteService {
  batchWrite(
    batchFn: (batchConfig: {
      batch: WriteBatch | WriteBatchMock,
      revertBatch: WriteBatch | WriteBatchMock,
      patchFns: Array<() => void>,
      revertFns: Array<() => void>,
      dbRevertFns: Array<() => void>,
      optimistic?: boolean,
    }) => void,
    options?: {
      optimistic?: boolean,
      loading?: WritableSignal<boolean>,
      snackBarConfig?: {
        successMessage: string,
        failureMessage: string,
        undoOnAction?: boolean,
        config?: MatSnackBarConfig<any>,
      }
    },
  ): Promise<void>;
}

export const BATCH_WRITE_SERVICE = new InjectionToken<BatchWriteService>('BatchWriteService');

export async function processBatchWrite(
  batchFn: (batchConfig: {
    batch: WriteBatchI,
    revertBatch: WriteBatchI,
    patchFns: Array<() => void>,
    revertFns: Array<() => void>,
    dbRevertFns: Array<() => void>,
    optimistic?: boolean,
  }) => void,
  options: {
    optimistic?: boolean,
    loading?: WritableSignal<boolean>,
    snackBarConfig?: {
      successMessage: string,
      failureMessage: string,
      undoOnAction?: boolean,
      config?: MatSnackBarConfig<any>,
    }
  },
  batch: WriteBatchI,
  revertBatch: WriteBatchI,
  snackBar: MatSnackBar,
) {
  const patchFns = [];
  const revertFns = [];
  const dbRevertFns = [];

  if (options?.optimistic) {
    // this includes optimistically patching locally assuming
    // they are using the add, update, remove functions from
    // the ngrx signal stores
    await batchFn({ batch, revertBatch, patchFns, revertFns, dbRevertFns, optimistic: options.optimistic });
    try {
      await batch.commit();
      if (options?.snackBarConfig) {
        openSnackBarWithUndoOption(
          snackBar,
          options.snackBarConfig,
          revertFns,
          dbRevertFns,
          revertBatch,
        );
      }
    } catch (e) {
      revertFns.forEach((revertFn) => revertFn());
      console.error(e);
      if (options?.snackBarConfig) {
        snackBar.open(
          options.snackBarConfig.failureMessage,
          '',
          options.snackBarConfig.config,
        );
      }
      throw e;
    }
  } else {
    // start loading icon
    options?.loading?.set(true);
    try {
      await batchFn({ batch, revertBatch, patchFns, revertFns, dbRevertFns });
      await batch.commit();
      patchFns.forEach((patchFn) => patchFn());

      if (options?.snackBarConfig) {
        openSnackBarWithUndoOption(
          snackBar,
          options.snackBarConfig,
          revertFns,
          dbRevertFns,
          revertBatch,
        );
      }
    } catch (e) {
      console.error(e);
      if (options?.snackBarConfig) {
        snackBar.open(
          options.snackBarConfig.failureMessage,
          '',
          options.snackBarConfig.config,
        );
      }
      throw e;
    } finally {
      // stop loading icon
      options?.loading?.set(false);
    }
  }
}
