// Entity Models
import { User } from './user/user.model';
import { UserContext } from './user-context/user-context.model';

export type AnyEntity =
  User |
  UserContext;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryParams = [string, string, any][];

export type QueryOptions = {
  orderBy?: string | [string, string],
  limit?: number,
  startAt?: string,
  startAfter?: string,
  endAt?: string,
  endBefore?: string,
}
