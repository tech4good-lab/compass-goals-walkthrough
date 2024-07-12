import { InjectionToken, Injectable, WritableSignal, inject } from '@angular/core';
import { Firestore, WriteBatch, writeBatch } from '@angular/fire/firestore';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FirebaseMockService } from '../firebase/firebase.mock.service';
import { processBatchWrite, BatchWriteService } from './batch-write.service';

@Injectable({
  providedIn: 'root',
})
export class BatchWriteDBService implements BatchWriteService {
  private firestore = inject(Firestore);
  private snackBar = inject(MatSnackBar);

  constructor(
  ) { }

  /**
   * @param batchFn function that contains any number of add, update,
   * or remove calls and writes them all as a batch write. It takes a
   * batchConfig as an input, which contains the batch and revertBatch objects
   * as the patchFns or revertFns arrays for collecting the functions
   * that need to be run to either add things to the store after success or
   * revert things from the store on failure in an optimistic write setting.
   * It also stores whether these will be optimistic writes or not.
   * @param options support for optimistic writes, a loading icon, and
   * a snackbar that has an undo option.
   */
  async batchWrite(
    batchFn: (batchConfig: {
      batch: WriteBatch,
      revertBatch: WriteBatch,
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
  ) {
    const batch = writeBatch(this.firestore);
    const revertBatch = writeBatch(this.firestore);

    try {
      await processBatchWrite(batchFn, options, batch, revertBatch, this.snackBar);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
