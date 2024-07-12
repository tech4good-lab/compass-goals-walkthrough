import { Timestamp } from '@angular/fire/firestore';
import { Hashtag } from './hashtag.model';
import { withEntitiesForMockDB } from '../app.store';
import { signalStore } from '@ngrx/signals';

export const HashtagMockDB = signalStore(
  { providedIn: 'root' },
  withEntitiesForMockDB<Hashtag>(),
);

export const HASHTAG_DB = [
  {
    __id: 'ht1',
    name: 'coverletter',
    color: '#EE8B72',
    _createdAt: Timestamp.now(),
    _updatedAt: Timestamp.now(),
    _deleted: false,
  },
  {
    __id: 'ht2',
    name: 'apply',
    color: '#2DBDB1',
    _createdAt: Timestamp.now(),
    _updatedAt: Timestamp.now(),
    _deleted: false,
  },
  {
    __id: 'ht3',
    name: 'interview',
    color: '#FFB987',
    _createdAt: Timestamp.now(),
    _updatedAt: Timestamp.now(),
    _deleted: false,
  },
];
