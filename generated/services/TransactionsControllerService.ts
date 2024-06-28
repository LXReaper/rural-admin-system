/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_TransactionsVO_ } from "../models/BaseResponse_Page_TransactionsVO_";
import type { BaseResponse_Transactions_ } from "../models/BaseResponse_Transactions_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { TransactionsAddRequest } from "../models/TransactionsAddRequest";
import type { TransactionsQueryRequest } from "../models/TransactionsQueryRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class TransactionsControllerService {
  /**
   * 生成订单
   * @param transactionsAddRequest transactionsAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static transactionsAddUsingPost(
    transactionsAddRequest: TransactionsAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/transactions/add",
      body: transactionsAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除订单
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteTransactionsUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/transactions/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据id获取订单信息
   * @param transactionId TransactionId
   * @returns BaseResponse_Transactions_ OK
   * @throws ApiError
   */
  public static getTransactionsByIdUsingGet(
    transactionId?: number
  ): CancelablePromise<BaseResponse_Transactions_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/transactions/get",
      query: {
        TransactionId: transactionId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取所有交易信息列表
   * @param transactionsQueryRequest transactionsQueryRequest
   * @returns BaseResponse_Page_TransactionsVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listTransactionsByPageUsingPost(
    transactionsQueryRequest: TransactionsQueryRequest
  ): CancelablePromise<BaseResponse_Page_TransactionsVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/transactions/list/page",
      body: transactionsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取自己的交易信息列表
   * @param transactionsQueryRequest transactionsQueryRequest
   * @returns BaseResponse_Page_TransactionsVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listMyTransactionsByPageUsingPost(
    transactionsQueryRequest: TransactionsQueryRequest
  ): CancelablePromise<BaseResponse_Page_TransactionsVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/transactions/list/page/my",
      body: transactionsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 处理交易订单
   * @param transactionsId transactions_Id
   * @returns BaseResponse_boolean_ OK
   * @throws ApiError
   */
  public static transactionsHandleUsingGet(
    transactionsId?: number
  ): CancelablePromise<BaseResponse_boolean_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/transactions/transaction/handle",
      query: {
        transactions_Id: transactionsId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
