/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LearningMaterialsVO } from "./LearningMaterialsVO";
import type { OrderItem } from "./OrderItem";

export type Page_LearningMaterialsVO_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<LearningMaterialsVO>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
