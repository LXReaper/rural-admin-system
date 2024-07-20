/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { ProductsVO } from "./ProductsVO";

export type TransactionsVO = {
  price?: Array<number>;
  product_id?: Array<number>;
  productsList?: Array<ProductsVO>;
  transaction_quantity?: Array<number>;
  transaction_status?: boolean;
  transaction_time?: string;
  transactions_Id?: number;
  user_id?: number;
  villager_name?: string;
};
