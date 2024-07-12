// Entity Models
import { WeeklyGoalReflection } from './weekly-goal-reflection/weekly-goal-reflection.model';
import { QuarterlyGoalReflection } from './quarterly-goal-reflection/quarterly-goal-reflection.model';
import { LongTermGoalReflection } from './long-term-goal-reflection/long-term-goal-reflection.model';
import { Hashtag } from './hashtag/hashtag.model';
import { LongTermGoal } from './long-term-goal/long-term-goal.model';
import { WeeklyGoal } from './weekly-goal/weekly-goal.model';
import { QuarterlyGoal } from './quarterly-goal/quarterly-goal.model';
import { User } from './user/user.model';
import { UserContext } from './user-context/user-context.model';

export type AnyEntity =
  WeeklyGoalReflection |
  QuarterlyGoalReflection |
  LongTermGoalReflection |
  Hashtag |
  LongTermGoal |
  WeeklyGoal |
  QuarterlyGoal |
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
