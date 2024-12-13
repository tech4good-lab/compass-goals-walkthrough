import { WeeklyGoal } from "src/app/core/store/weekly-goal/weekly-goal.model";
import { Hashtag } from "src/app/core/store/hashtag/hashtag.model";

export interface WeeklyGoalData extends WeeklyGoal {
  hashtag: Hashtag;
}