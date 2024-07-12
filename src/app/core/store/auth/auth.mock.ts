import { signalStore, patchState, withState, withMethods, signalStoreFeature } from '@ngrx/signals';
import { USER_DB } from '../user/user.mock';

export const AuthMockDB = signalStore(
  { providedIn: 'root' },
  withState({ user: null }),
  withMethods((store) => ({
    login() {
      patchState(store, { user: {
        uid: USER_DB[0].__id,
        email: USER_DB[0].email,
        displayName: USER_DB[0].name,
        photoURL: USER_DB[0].photoURL,
      } });
    },
    logout() {
      patchState(store, { user: null });
    },
  })),
);
