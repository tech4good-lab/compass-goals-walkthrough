import { Timestamp } from '@angular/fire/firestore';
import { withEntitiesForMockDB } from '../app.store';
import { signalStore } from '@ngrx/signals';
import { User, AccessState } from './user.model';

export const UserDB = signalStore(
  { providedIn: 'root' },
  withEntitiesForMockDB<User>(),
);

export const USER_DB: User[] = [
  {
    __id: '1',
    email: 'a@sample.com',
    name: 'User A',
    photoURL: 'http://loremflickr.com/100/100',
    isAdmin: false,
    consented: true,
    accessState: AccessState.DONE,
    _createdAt: Timestamp.now(),
    _updatedAt: Timestamp.now(),
    _deleted: false,
  },
];
