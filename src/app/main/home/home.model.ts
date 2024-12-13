import { WeeklyGoal } from "src/app/core/store/weekly-goal/weekly-goal.model";
import { Hashtag } from "src/app/core/store/hashtag/hashtag.model";
import { QuarterlyGoal } from "src/app/core/store/quarterly-goal/quarterly-goal.model";

export interface WeeklyGoalData extends WeeklyGoal {
  hashtag: Hashtag;
}

export interface QuarterlyGoalData extends QuarterlyGoal {
   hashtag: Hashtag;
   weeklyGoalsTotal: number;
   weeklyGoalsComplete: number;
 }

export interface WeeklyGoalInForm {
  // Form fields
  text: string;
  __quarterlyGoalId: string;
  _deleted: boolean;
  originalText?: string;
  __weeklyGoalId?: string;
  originalOrder?: number;
  originalQuarterlyGoalId?: string;
  _new: boolean;
}