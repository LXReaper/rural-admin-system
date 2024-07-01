/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NoticesVO } from "./NoticesVO";
import type { OrderItem } from "./OrderItem";

export type Page_NoticesVO_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<NoticesVO>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
