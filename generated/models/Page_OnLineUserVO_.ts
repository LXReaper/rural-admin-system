/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OnLineUserVO } from "./OnLineUserVO";
import type { OrderItem } from "./OrderItem";

export type Page_OnLineUserVO_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<OnLineUserVO>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
