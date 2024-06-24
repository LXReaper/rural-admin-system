/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Transactions_ } from "../models/BaseResponse_Page_Transactions_";
import type { BaseResponse_Transactions_ } from "../models/BaseResponse_Transactions_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { TransactionsAddRequest } from "../models/TransactionsAddRequest";
import type { TransactionsQueryRequest } from "../models/TransactionsQueryRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class TransactionsControllerService {
  /**
   * transactionsAdd
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
   * deleteTransactions
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
   * getTransactionsById
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
   * listTransactionsByPage
   * @param transactionsQueryRequest transactionsQueryRequest
   * @returns BaseResponse_Page_Transactions_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listTransactionsByPageUsingPost(
    transactionsQueryRequest: TransactionsQueryRequest
  ): CancelablePromise<BaseResponse_Page_Transactions_ | any> {
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
}
