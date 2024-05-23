/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_double_ } from "../models/BaseResponse_double_";
import type { BaseResponse_Page_Points_ } from "../models/BaseResponse_Page_Points_";
import type { PointsQueryRequest } from "../models/PointsQueryRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class PointsControllerService {
  /**
   * getRemainingPointsByUserID
   * @param userId userID
   * @returns BaseResponse_double_ OK
   * @throws ApiError
   */
  public static getRemainingPointsByUserIdUsingGet(
    userId?: number
  ): CancelablePromise<BaseResponse_double_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/points/get",
      query: {
        userID: userId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listPointsByPage
   * @param pointsQueryRequest pointsQueryRequest
   * @returns BaseResponse_Page_Points_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listPointsByPageUsingPost(
    pointsQueryRequest: PointsQueryRequest
  ): CancelablePromise<BaseResponse_Page_Points_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/points/list/page",
      body: pointsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
