/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Notices } from "./Notices";
import type { OrderItem } from "./OrderItem";

export type Page_Notices_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<Notices>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
