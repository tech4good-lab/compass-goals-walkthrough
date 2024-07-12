import { InjectionToken, Injectable, WritableSignal, inject } from '@angular/core';
import { Firestore, WriteBatch, writeBatch } from '@angular/fire/firestore';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FirebaseMockService } from '../firebase/firebase.mock.service';
import { WriteBatchI, BatchWriteService, processBatchWrite } from './batch-write.service';

// after doing a bunch of update/sets, then we need to actually do that when we commit
export class WriteBatchMock {
  saveFns;
  db;

  // Constant for simulating delay (e.g. to see loading icon in action)
  PUT_LATENCY_SIMULATION_DELAY = 300;

  constructor(
    db: FirebaseMockService,
  ) {
    this.saveFns = [];
    this.db = db;
  }

  async update(docRef, changes) {
    const [collectionName, id] = docRef.path.split('/').slice(0, 2);
    this.saveFns.push(async () => {
      try {
        await this.db.updateEntity(collectionName, id, changes);
      } catch (e) {
        console.error(e);
        throw e;
      }
    });
  }

  async set(docRef, entity) {
    const [collectionName] = docRef.path.split('/').slice(0, 1);
    this.saveFns.push(async () => {
      try {
        await this.db.addEntity(collectionName, entity);
      } catch (e) {
        console.error(e);
        throw e;
      }
    });
  }

  async delete(docRef) {
    const [collectionName, id] = docRef.path.split('/').slice(0, 2);
    this.saveFns.push(async () => {
      try {
        await this.db.removeEntity(collectionName, id);
      } catch (e) {
        console.error(e);
        throw e;
      }
    });
  }

  async commit() {
    await new Promise((resolve) => setTimeout(resolve, this.PUT_LATENCY_SIMULATION_DELAY));
    return Promise.all(this.saveFns.map((saveFn) => saveFn()));
  }
}

@Injectable({
  providedIn: 'root',
})
export class BatchWriteMockService implements BatchWriteService {
  private snackBar = inject(MatSnackBar);

  constructor(
    private db: FirebaseMockService,
  ) {
  }

  async batchWrite(
    batchFn: (batchConfig: {
      batch: WriteBatchMock,
      revertBatch: WriteBatchMock,
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
  ): Promise<void> {
    const batch = new WriteBatchMock(this.db);
    const revertBatch = new WriteBatchMock(this.db);

    try {
      await processBatchWrite(batchFn, options, batch, revertBatch, this.snackBar);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
