/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Announcements } from "./Announcements";
import type { OrderItem } from "./OrderItem";

export type Page_Announcements_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<Announcements>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
