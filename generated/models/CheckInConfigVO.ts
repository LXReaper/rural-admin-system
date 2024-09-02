import { CheckInReward } from "./CheckInReward";

export type CheckInConfigVO = {
  checkInOpen?: number;
  checkInModel?: number;
  checkInRemind?: number;
  checkInPoint?: number;
  checkInExperience?: number;
  checkInRewardList?: Array<CheckInReward>;
};
