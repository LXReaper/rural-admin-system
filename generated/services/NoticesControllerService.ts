/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_NoticesVO_ } from "../models/BaseResponse_NoticesVO_";
import type { BaseResponse_Page_Notices_ } from "../models/BaseResponse_Page_Notices_";
import type { BaseResponse_Page_NoticesVO_ } from "../models/BaseResponse_Page_NoticesVO_";
import type { NoticesAddRequest } from "../models/NoticesAddRequest";
import type { NoticesQueryRequest } from "../models/NoticesQueryRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import { DeleteRequest } from "../models/DeleteRequest";

export class NoticesControllerService {
  /**
   * 添加通知
   * @param noticesAddRequest noticesAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static postNoticeUsingPost(
    noticesAddRequest: NoticesAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/notices/add",
      body: noticesAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除通知信息
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteNoticeUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/notices/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据id获取通知包装类
   * @param id id
   * @returns BaseResponse_NoticesVO_ OK
   * @throws ApiError
   */
  public static getNoticesVoByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_NoticesVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/notices/get/vo",
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
   * 分页展示通知信息
   * @param noticesQueryRequest noticesQueryRequest
   * @returns BaseResponse_Page_Notices_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listNoticesByPageUsingPost(
    noticesQueryRequest: NoticesQueryRequest
  ): CancelablePromise<BaseResponse_Page_Notices_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/notices/list/page",
      body: noticesQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取通知信息封装列表
   * @param noticesQueryRequest noticesQueryRequest
   * @returns BaseResponse_Page_NoticesVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listNoticesVoByPageUsingPost(
    noticesQueryRequest: NoticesQueryRequest
  ): CancelablePromise<BaseResponse_Page_NoticesVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/notices/list/page/vo",
      body: noticesQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
