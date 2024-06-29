/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LearningMaterials } from "./LearningMaterials";
import type { OrderItem } from "./OrderItem";

export type Page_LearningMaterials_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<LearningMaterials>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
