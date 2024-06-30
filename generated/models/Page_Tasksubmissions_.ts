/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from "./OrderItem";
import type { Tasksubmissions } from "./Tasksubmissions";

export type Page_Tasksubmissions_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<Tasksubmissions>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
