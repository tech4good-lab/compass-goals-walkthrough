import { Timestamp } from '@angular/fire/firestore';
import { UserContext } from './user-context.model';
import { withEntitiesForMockDB } from '../app.store';
import { signalStore } from '@ngrx/signals';
import { USER_DB } from '../user/user.mock';

export const UserContextMockDB = signalStore(
  { providedIn: 'root' },
  withEntitiesForMockDB<UserContext>(),
);

export const USERCONTEXT_DB = [
  {
    __id: 'uc1',
    __userId: USER_DB[0].__id,
    background: {
      selections: ['option1'],
    },
    desiredValue: 'test',
    _createdAt: Timestamp.now(),
    _updatedAt: Timestamp.now(),
    _deleted: false,
  },
];
