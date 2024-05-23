/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LearningmaterialsVO } from "./LearningmaterialsVO";
import type { OrderItem } from "./OrderItem";

export type Page_LearningmaterialsVO_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<LearningmaterialsVO>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
