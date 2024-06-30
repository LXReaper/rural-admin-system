/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from "./OrderItem";
import type { TasksExamineVO } from "./TasksExamineVO";

export type Page_TasksExamineVO_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<TasksExamineVO>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
