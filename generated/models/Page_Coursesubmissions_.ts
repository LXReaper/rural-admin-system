/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Coursesubmissions } from "./Coursesubmissions";
import type { OrderItem } from "./OrderItem";

export type Page_Coursesubmissions_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<Coursesubmissions>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
