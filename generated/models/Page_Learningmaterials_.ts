/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Learningmaterials } from "./Learningmaterials";
import type { OrderItem } from "./OrderItem";

export type Page_Learningmaterials_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<Learningmaterials>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
