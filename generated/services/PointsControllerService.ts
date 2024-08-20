/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_double_ } from "../models/BaseResponse_double_";
import type { BaseResponse_Page_Points_ } from "../models/BaseResponse_Page_Points_";
import type { BaseResponse_Page_PointsVO_ } from "../models/BaseResponse_Page_PointsVO_";
import type { BaseResponse_Points_ } from "../models/BaseResponse_Points_";
import type { BaseResponse_PointsVO_ } from "../models/BaseResponse_PointsVO_";
import type { PointsQueryRequest } from "../models/PointsQueryRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import { PointRecordTypeCountRequest } from "../models/PointRecordTypeCountRequest";
import { BaseResponse_PointRecordTypeCount_ } from "../models/BaseResponse_PointRecordTypeCount_";

export class PointsControllerService {
  /**
   * 查看自己的积分
   * @returns BaseResponse_Points_ OK
   * @throws ApiError
   */
  public static getMyPointsUsingGet(): CancelablePromise<BaseResponse_Points_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/point/points/get",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 查看某人的积分信息
   * @param userId userId
   * @returns BaseResponse_Points_ OK
   * @throws ApiError
   */
  public static getPointsByIdUsingGet(
    userId?: number
  ): CancelablePromise<BaseResponse_Points_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/point/points/get/AllPoints",
      query: {
        userId: userId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据用户id查询剩余积分
   * @param userId userId
   * @returns BaseResponse_double_ OK
   * @throws ApiError
   */
  public static getRemainingPointsByUserIdUsingGet(
    userId?: number
  ): CancelablePromise<BaseResponse_double_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/point/points/get/RemainingPoints",
      query: {
        userId: userId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据id获取积分信息包装类
   * @param id id
   * @returns BaseResponse_PointsVO_ OK
   * @throws ApiError
   */
  public static getPointsVoUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_PointsVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/point/points/get/vo",
      query: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取积分列表
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
      url: "/api/point/points/list/page",
      body: pointsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取积分信息封装列表
   * @param pointsQueryRequest pointsQueryRequest
   * @returns BaseResponse_Page_PointsVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listPointsVoByPageUsingPost(
    pointsQueryRequest: PointsQueryRequest
  ): CancelablePromise<BaseResponse_Page_PointsVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/point/points/list/page/vo",
      body: pointsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 结算积分
   * @returns BaseResponse_boolean_ OK
   * @throws ApiError
   */
  public static settlePointsUsingGet(): CancelablePromise<BaseResponse_boolean_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/point/points/settle",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
