import { CheckInReward } from "./CheckInReward";

export type CheckInConfigUpdateRequest = {
  checkInOpen?: number;
  checkInModel?: number;
  checkInRemind?: number;
  checkInPoint?: number;
  checkInExperience?: number;
  checkInRewardList?: Array<CheckInReward>;
  userId?: number;
};
