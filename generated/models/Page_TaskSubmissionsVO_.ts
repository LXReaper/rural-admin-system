/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from "./OrderItem";
import type { TaskSubmissionsVO } from "./TaskSubmissionsVO";

export type Page_TaskSubmissionsVO_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<TaskSubmissionsVO>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
