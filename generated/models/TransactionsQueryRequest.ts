/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TransactionsQueryRequest = {
  current?: number;
  pageSize?: number;
  productId?: Array<number>;
  sortField?: string;
  sortOrder?: string;
  transactionTime?: string;
  transaction_status?: boolean;
  transaction_quantity?: string;
  transactionsId?: number;
  userId?: number;
  userName?: string;
};
