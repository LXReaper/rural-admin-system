/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnnouncementsVO } from "./AnnouncementsVO";
import type { OrderItem } from "./OrderItem";

export type Page_AnnouncementsVO_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<AnnouncementsVO>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
